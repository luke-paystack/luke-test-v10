import * as fs from 'fs';
import * as path from 'path';

import { getFromContainer, MetadataStorage } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import deepEqual from 'deep-equal';
import glob from 'glob';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';

import { env } from '../env';


export function buildSwagger(): void {
  // Create the options.
  const routingControllersOptions = {
    controllers: env.app.dirs.controllers,
    middlewares: env.app.dirs.middlewares,
    validation: true,
  };

  // Dynamically load the controllers and then generate the swagger docs.
  env.app.dirs.controllers.forEach((pth) => {
    const ctrlFiles = glob.sync(pth);
    ctrlFiles.forEach((ctrlFile) => {
      require(ctrlFile);
    });
  });
  // Parse routing-controllers classes into OpenAPI spec:
  const metadatas = (getFromContainer(MetadataStorage) as any).validationMetadatas;
  const schemas = validationMetadatasToSchemas(metadatas);
  const storage = getMetadataArgsStorage();
  const spec = routingControllersToSpec(storage, routingControllersOptions, {
    components: { schemas },
    info: {
      title: env.app.name,
      description: env.app.description,
      version: env.app.version,
    },
  });

  const swaggerFile = path.join(__dirname, '../', env.swagger.file);
  fs.stat(swaggerFile, (fileFoundErr) => {
    let swaggerFileObject = undefined;
    if (!fileFoundErr) {
      swaggerFileObject = require(swaggerFile);
    }
    const newSpec = JSON.stringify(spec, undefined, '\t');
    if (!deepEqual(swaggerFileObject, spec)) {
      fs.writeFile(swaggerFile, newSpec, 'utf8', (err) => {
        if (err) {
          console.error('ERROR writing swager file: ' + err);
          return;
        }
        console.log('Regenerating swagger doc: ' + swaggerFile);
      });
    }
  });
}
