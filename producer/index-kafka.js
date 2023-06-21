const { Kafka } = require("kafkajs");
const { CompressionTypes, CompressionCodecs } = require("kafkajs");
const SnappyCodec = require("kafkajs-snappy");

CompressionCodecs[CompressionTypes.Snappy] = SnappyCodec;

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["172.16.1.218:19092", "172.16.1.218:29092", "172.16.1.218:39092"],
});

const producer = kafka.producer();

const run = async () => {
  // Producing
  await producer.connect();
  await producer.send({
    topic: "tester",
    compression: CompressionTypes.Snappy,
    messages: [{ value: "Hello KafkaJS user!" }],
  });
};
setInterval(() => {
  run()
    .then(() => console.log("queued"))
    .catch(console.error);
}, 2000);
