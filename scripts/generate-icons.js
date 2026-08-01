const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

// Helper to calculate CRC32 for PNG chunks
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 8) : c >>> 8;
  }
  crcTable[n] = c;
}

function createChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(12 + len);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, "ascii");
  data.copy(buf, 8);
  const crc = crc32(buf.subarray(4, 8 + len));
  buf.writeUInt32BE(crc, 8 + len);
  return buf;
}

function generatePNG(width, height, r = 16, g = 185, b = 129) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // Bit depth
  ihdr[9] = 2; // Color type: Truecolor RGB
  ihdr[10] = 0; // Compression method
  ihdr[11] = 0; // Filter method
  ihdr[12] = 0; // Interlace method
  const ihdrChunk = createChunk("IHDR", ihdr);

  // Raw image data with filter byte (0) per scanline
  const rowSize = 1 + width * 3;
  const rawData = Buffer.alloc(height * rowSize);
  for (let y = 0; y < height; y++) {
    const offset = y * rowSize;
    rawData[offset] = 0; // Filter type None
    for (let x = 0; x < width; x++) {
      const px = offset + 1 + x * 3;
      rawData[px] = r;
      rawData[px + 1] = g;
      rawData[px + 2] = b;
    }
  }

  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = createChunk("IDAT", compressedData);
  const iendChunk = createChunk("IEND", Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Generate Icons
const icon192 = generatePNG(192, 192, 16, 185, 129); // Emerald #10b981
const icon512 = generatePNG(512, 512, 6, 182, 212); // Cyan #06b6d4

const publicDir = path.join(__dirname, "../public");
const appDir = path.join(__dirname, "../src/app");

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

fs.writeFileSync(path.join(publicDir, "icon.png"), icon192);
fs.writeFileSync(path.join(publicDir, "apple-icon.png"), icon512);
fs.writeFileSync(path.join(publicDir, "favicon.ico"), icon192);

fs.writeFileSync(path.join(appDir, "icon.png"), icon192);
fs.writeFileSync(path.join(appDir, "apple-icon.png"), icon512);
fs.writeFileSync(path.join(appDir, "favicon.ico"), icon192);

console.log("✅ Successfully generated valid PNG & ICO brand icon assets!");
