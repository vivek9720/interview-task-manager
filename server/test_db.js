const dns = require("dns");

console.log("=== DNS Test ===");

dns.resolveSrv("_mongodb._tcp.elivexcluster.wy4mxpf.mongodb.net", (err, addrs) => {
  if (err) {
    console.log("SRV lookup FAILED:", err.code, err.message);
  } else {
    console.log("SRV lookup OK:", JSON.stringify(addrs));
  }
});

dns.resolve4("ac-wqhsvho-shard-00-00.wy4mxpf.mongodb.net", (err, addrs) => {
  if (err) {
    console.log("A record lookup FAILED:", err.code, err.message);
  } else {
    console.log("A record lookup OK:", addrs);
  }
});

const net = require("net");
const socket = new net.Socket();
socket.setTimeout(10000);
socket.connect(27017, "ac-wqhsvho-shard-00-00.wy4mxpf.mongodb.net", () => {
  console.log("TCP connection to port 27017: SUCCESS");
  socket.destroy();
});
socket.on("error", (e) => {
  console.log("TCP connection to port 27017: FAILED -", e.message);
});
socket.on("timeout", () => {
  console.log("TCP connection to port 27017: TIMED OUT");
  socket.destroy();
});
