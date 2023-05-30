
import { Kafka, logLevel } from 'kafkajs';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { Container } from 'typedi';

import { env } from '../env';

export const kafkaLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings) => {
  const kafka = new Kafka({
    clientId: env.kafka.clientId,
    brokers: env.kafka.brokers,
    logLevel: logLevel.ERROR,
    ssl: env.kafka.ssl,
  });
  Container.set('kafka.client', kafka);

  const producer = kafka.producer();
  try {
    console.log('Initializing Kafka producer...');
    await producer.connect();
    Container.set('kafka.producer', producer);
    settings.onShutdown(async () => {
      console.log('Disconnecting Kafka producer...');
      await producer.disconnect();
      console.log('Kafka producer disconnected.');
    });
  } catch (err) {
    console.log(`Error initializing Kafka producer: ${err}`);
  }
};
