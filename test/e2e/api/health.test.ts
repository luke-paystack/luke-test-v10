import request from 'supertest';
import { bootstrapApp, BootstrapSettings } from '../../../src/utils/test/e2e/bootstrap';

describe('/', () => {

  // -------------------------------------------------------------------------
  // Setup up
  // -------------------------------------------------------------------------

  let settings: BootstrapSettings;
  beforeAll(async () => settings = await bootstrapApp());

  // -------------------------------------------------------------------------
  // Test cases
  // -------------------------------------------------------------------------

  test('POST: /health should test he health ok', async () => {
    await request(settings.app)
      .get('/health')
      .expect('Content-Type', /json/)
      .expect(200);
  });
  test('POST: /health should test he health not ok', async () => {
    await settings.connection.destroy();
    await request(settings.app)
      .get('/health')
      .expect('Content-Type', /json/)
      .expect(500);
  });
});