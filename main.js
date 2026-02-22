"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/dns-equal/index.js
var require_dns_equal = __commonJS({
  "node_modules/dns-equal/index.js"(exports2, module2) {
    "use strict";
    var r = /[A-Z]/g;
    module2.exports = function(a, b) {
      a = a.replace(r, replacer);
      b = b.replace(r, replacer);
      return a === b;
    };
    function replacer(m) {
      return m.toLowerCase();
    }
  }
});

// node_modules/array-flatten/array-flatten.js
var require_array_flatten = __commonJS({
  "node_modules/array-flatten/array-flatten.js"(exports2, module2) {
    "use strict";
    module2.exports = flatten;
    module2.exports.from = flattenFrom;
    module2.exports.depth = flattenDepth;
    module2.exports.fromDepth = flattenFromDepth;
    function flatten(array) {
      if (!Array.isArray(array)) {
        throw new TypeError("Expected value to be an array");
      }
      return flattenFrom(array);
    }
    function flattenFrom(array) {
      return flattenDown(array, []);
    }
    function flattenDepth(array, depth) {
      if (!Array.isArray(array)) {
        throw new TypeError("Expected value to be an array");
      }
      return flattenFromDepth(array, depth);
    }
    function flattenFromDepth(array, depth) {
      if (typeof depth !== "number") {
        throw new TypeError("Expected the depth to be a number");
      }
      return flattenDownDepth(array, [], depth);
    }
    function flattenDown(array, result) {
      for (var i = 0; i < array.length; i++) {
        var value = array[i];
        if (Array.isArray(value)) {
          flattenDown(value, result);
        } else {
          result.push(value);
        }
      }
      return result;
    }
    function flattenDownDepth(array, result, depth) {
      depth--;
      for (var i = 0; i < array.length; i++) {
        var value = array[i];
        if (depth > -1 && Array.isArray(value)) {
          flattenDownDepth(value, result, depth);
        } else {
          result.push(value);
        }
      }
      return result;
    }
  }
});

// node_modules/multicast-dns-service-types/index.js
var require_multicast_dns_service_types = __commonJS({
  "node_modules/multicast-dns-service-types/index.js"(exports2) {
    var prefix = function(name) {
      return "_" + name;
    };
    var defined = function(name) {
      return name;
    };
    exports2.stringify = function(data) {
      if (typeof data === "object" && data && data.name) return exports2.stringify(data.name, data.protocol, data.subtypes);
      return Array.prototype.concat.apply([], arguments).filter(defined).map(prefix).join(".");
    };
    exports2.parse = function(str) {
      var parts = str.split(".");
      for (var i = 0; i < parts.length; i++) {
        if (parts[i][0] !== "_") continue;
        parts[i] = parts[i].slice(1);
      }
      return {
        name: parts.shift(),
        protocol: parts.shift() || null,
        subtypes: parts
      };
    };
    exports2.tcp = function(name) {
      return exports2.stringify(name, "tcp", Array.prototype.concat.apply([], Array.prototype.slice.call(arguments, 1)));
    };
    exports2.udp = function(name) {
      return exports2.stringify(name, "udp", Array.prototype.concat.apply([], Array.prototype.slice.call(arguments, 1)));
    };
  }
});

// node_modules/buffer-indexof/index.js
var require_buffer_indexof = __commonJS({
  "node_modules/buffer-indexof/index.js"(exports2, module2) {
    module2.exports = function bufferIndexOf(buff, search, offset, encoding) {
      if (!Buffer.isBuffer(buff)) {
        throw TypeError("buffer is not a buffer");
      }
      if (encoding === void 0 && typeof offset === "string") {
        encoding = offset;
        offset = void 0;
      }
      if (typeof search === "string") {
        search = new Buffer(search, encoding || "utf8");
      } else if (typeof search === "number" && !isNaN(search)) {
        search = new Buffer([search]);
      } else if (!Buffer.isBuffer(search)) {
        throw TypeError("search is not a bufferable object");
      }
      if (search.length === 0) {
        return -1;
      }
      if (offset === void 0 || typeof offset === "number" && isNaN(offset)) {
        offset = 0;
      } else if (typeof offset !== "number") {
        throw TypeError("offset is not a number");
      }
      if (offset < 0) {
        offset = buff.length + offset;
      }
      if (offset < 0) {
        offset = 0;
      }
      var m = 0;
      var s = -1;
      for (var i = offset; i < buff.length; ++i) {
        if (buff[i] != search[m]) {
          s = -1;
          i -= m - 1;
          m = 0;
        }
        if (buff[i] == search[m]) {
          if (s == -1) {
            s = i;
          }
          ++m;
          if (m == search.length) {
            break;
          }
        }
      }
      if (s > -1 && buff.length - s < search.length) {
        return -1;
      }
      return s;
    };
  }
});

// node_modules/dns-txt/index.js
var require_dns_txt = __commonJS({
  "node_modules/dns-txt/index.js"(exports2, module2) {
    "use strict";
    var bindexOf = require_buffer_indexof();
    var equalSign = new Buffer("=");
    module2.exports = function(opts) {
      var binary = opts ? opts.binary : false;
      var that = {};
      that.encode = function(data, buf, offset) {
        if (!data) data = {};
        if (!offset) offset = 0;
        if (!buf) buf = new Buffer(that.encodingLength(data) + offset);
        var oldOffset = offset;
        var keys = Object.keys(data);
        if (keys.length === 0) {
          buf[offset] = 0;
          offset++;
        }
        keys.forEach(function(key) {
          var val = data[key];
          var oldOffset2 = offset;
          offset++;
          if (val === true) {
            offset += buf.write(key, offset);
          } else if (Buffer.isBuffer(val)) {
            offset += buf.write(key + "=", offset);
            var len = val.length;
            val.copy(buf, offset, 0, len);
            offset += len;
          } else {
            offset += buf.write(key + "=" + val, offset);
          }
          buf[oldOffset2] = offset - oldOffset2 - 1;
        });
        that.encode.bytes = offset - oldOffset;
        return buf;
      };
      that.decode = function(buf, offset, len) {
        if (!offset) offset = 0;
        if (!Number.isFinite(len)) len = buf.length;
        var data = {};
        var oldOffset = offset;
        while (offset < len) {
          var b = decodeBlock(buf, offset);
          var i = bindexOf(b, equalSign);
          offset += decodeBlock.bytes;
          if (b.length === 0) continue;
          if (i === -1) data[b.toString().toLowerCase()] = true;
          else if (i === 0) continue;
          else {
            var key = b.slice(0, i).toString().toLowerCase();
            if (key in data) continue;
            data[key] = binary ? b.slice(i + 1) : b.slice(i + 1).toString();
          }
        }
        that.decode.bytes = offset - oldOffset;
        return data;
      };
      that.encodingLength = function(data) {
        if (!data) return 1;
        var keys = Object.keys(data);
        if (keys.length === 0) return 1;
        return keys.reduce(function(total, key) {
          var val = data[key];
          total += Buffer.byteLength(key) + 1;
          if (Buffer.isBuffer(val)) total += val.length + 1;
          else if (val !== true) total += Buffer.byteLength(String(val)) + 1;
          return total;
        }, 0);
      };
      return that;
    };
    function decodeBlock(buf, offset) {
      var len = buf[offset];
      var to = offset + 1 + len;
      var b = buf.slice(offset + 1, to > buf.length ? buf.length : to);
      decodeBlock.bytes = len + 1;
      return b;
    }
  }
});

// node_modules/bonjour/lib/service.js
var require_service = __commonJS({
  "node_modules/bonjour/lib/service.js"(exports2, module2) {
    "use strict";
    var os2 = require("os");
    var util = require("util");
    var EventEmitter = require("events").EventEmitter;
    var serviceName = require_multicast_dns_service_types();
    var txt = require_dns_txt()();
    var TLD = ".local";
    module2.exports = Service;
    util.inherits(Service, EventEmitter);
    function Service(opts) {
      if (!opts.name) throw new Error("Required name not given");
      if (!opts.type) throw new Error("Required type not given");
      if (!opts.port) throw new Error("Required port not given");
      this.name = opts.name;
      this.protocol = opts.protocol || "tcp";
      this.type = serviceName.stringify(opts.type, this.protocol);
      this.host = opts.host || os2.hostname();
      this.port = opts.port;
      this.fqdn = this.name + "." + this.type + TLD;
      this.subtypes = opts.subtypes || null;
      this.txt = opts.txt || null;
      this.published = false;
      this._activated = false;
    }
    Service.prototype._records = function() {
      var records = [rrPtr(this), rrSrv(this), rrTxt(this)];
      var self = this;
      var interfaces = os2.networkInterfaces();
      Object.keys(interfaces).forEach(function(name) {
        interfaces[name].forEach(function(addr) {
          if (addr.internal) return;
          if (addr.family === "IPv4") {
            records.push(rrA(self, addr.address));
          } else {
            records.push(rrAaaa(self, addr.address));
          }
        });
      });
      return records;
    };
    function rrPtr(service) {
      return {
        name: service.type + TLD,
        type: "PTR",
        ttl: 28800,
        data: service.fqdn
      };
    }
    function rrSrv(service) {
      return {
        name: service.fqdn,
        type: "SRV",
        ttl: 120,
        data: {
          port: service.port,
          target: service.host
        }
      };
    }
    function rrTxt(service) {
      return {
        name: service.fqdn,
        type: "TXT",
        ttl: 4500,
        data: txt.encode(service.txt)
      };
    }
    function rrA(service, ip) {
      return {
        name: service.host,
        type: "A",
        ttl: 120,
        data: ip
      };
    }
    function rrAaaa(service, ip) {
      return {
        name: service.host,
        type: "AAAA",
        ttl: 120,
        data: ip
      };
    }
  }
});

// node_modules/bonjour/lib/registry.js
var require_registry = __commonJS({
  "node_modules/bonjour/lib/registry.js"(exports2, module2) {
    "use strict";
    var dnsEqual = require_dns_equal();
    var flatten = require_array_flatten();
    var Service = require_service();
    var REANNOUNCE_MAX_MS = 60 * 60 * 1e3;
    var REANNOUNCE_FACTOR = 3;
    module2.exports = Registry;
    function Registry(server) {
      this._server = server;
      this._services = [];
    }
    Registry.prototype.publish = function(opts) {
      var service = new Service(opts);
      service.start = start.bind(service, this);
      service.stop = stop.bind(service, this);
      service.start({ probe: opts.probe !== false });
      return service;
    };
    Registry.prototype.unpublishAll = function(cb) {
      teardown(this._server, this._services, cb);
      this._services = [];
    };
    Registry.prototype.destroy = function() {
      this._services.forEach(function(service) {
        service._destroyed = true;
      });
    };
    function start(registry, opts) {
      if (this._activated) return;
      this._activated = true;
      registry._services.push(this);
      if (opts.probe) {
        var service = this;
        probe(registry._server.mdns, this, function(exists) {
          if (exists) {
            service.stop();
            service.emit("error", new Error("Service name is already in use on the network"));
            return;
          }
          announce(registry._server, service);
        });
      } else {
        announce(registry._server, this);
      }
    }
    function stop(registry, cb) {
      if (!this._activated) return;
      teardown(registry._server, this, cb);
      var index = registry._services.indexOf(this);
      if (index !== -1) registry._services.splice(index, 1);
    }
    function probe(mdns, service, cb) {
      var sent = false;
      var retries = 0;
      var timer;
      mdns.on("response", onresponse);
      setTimeout(send, Math.random() * 250);
      function send() {
        if (!service._activated || service._destroyed) return;
        mdns.query(service.fqdn, "ANY", function() {
          sent = true;
          timer = setTimeout(++retries < 3 ? send : done, 250);
          timer.unref();
        });
      }
      function onresponse(packet) {
        if (!sent) return;
        if (packet.answers.some(matchRR) || packet.additionals.some(matchRR)) done(true);
      }
      function matchRR(rr) {
        return dnsEqual(rr.name, service.fqdn);
      }
      function done(exists) {
        mdns.removeListener("response", onresponse);
        clearTimeout(timer);
        cb(!!exists);
      }
    }
    function announce(server, service) {
      var delay = 1e3;
      var packet = service._records();
      server.register(packet);
      (function broadcast() {
        if (!service._activated || service._destroyed) return;
        server.mdns.respond(packet, function() {
          if (!service.published) {
            service._activated = true;
            service.published = true;
            service.emit("up");
          }
          delay = delay * REANNOUNCE_FACTOR;
          if (delay < REANNOUNCE_MAX_MS && !service._destroyed) {
            setTimeout(broadcast, delay).unref();
          }
        });
      })();
    }
    function teardown(server, services, cb) {
      if (!Array.isArray(services)) services = [services];
      services = services.filter(function(service) {
        return service._activated;
      });
      var records = flatten.depth(services.map(function(service) {
        service._activated = false;
        var records2 = service._records();
        records2.forEach(function(record) {
          record.ttl = 0;
        });
        return records2;
      }), 1);
      if (records.length === 0) return cb && cb();
      server.unregister(records);
      server.mdns.respond(records, function() {
        services.forEach(function(service) {
          service.published = false;
        });
        if (cb) cb.apply(null, arguments);
      });
    }
  }
});

// node_modules/dns-packet/types.js
var require_types = __commonJS({
  "node_modules/dns-packet/types.js"(exports2) {
    "use strict";
    exports2.toString = function(type) {
      switch (type) {
        case 1:
          return "A";
        case 10:
          return "NULL";
        case 28:
          return "AAAA";
        case 18:
          return "AFSDB";
        case 42:
          return "APL";
        case 257:
          return "CAA";
        case 60:
          return "CDNSKEY";
        case 59:
          return "CDS";
        case 37:
          return "CERT";
        case 5:
          return "CNAME";
        case 49:
          return "DHCID";
        case 32769:
          return "DLV";
        case 39:
          return "DNAME";
        case 48:
          return "DNSKEY";
        case 43:
          return "DS";
        case 55:
          return "HIP";
        case 13:
          return "HINFO";
        case 45:
          return "IPSECKEY";
        case 25:
          return "KEY";
        case 36:
          return "KX";
        case 29:
          return "LOC";
        case 15:
          return "MX";
        case 35:
          return "NAPTR";
        case 2:
          return "NS";
        case 47:
          return "NSEC";
        case 50:
          return "NSEC3";
        case 51:
          return "NSEC3PARAM";
        case 12:
          return "PTR";
        case 46:
          return "RRSIG";
        case 17:
          return "RP";
        case 24:
          return "SIG";
        case 6:
          return "SOA";
        case 99:
          return "SPF";
        case 33:
          return "SRV";
        case 44:
          return "SSHFP";
        case 32768:
          return "TA";
        case 249:
          return "TKEY";
        case 52:
          return "TLSA";
        case 250:
          return "TSIG";
        case 16:
          return "TXT";
        case 252:
          return "AXFR";
        case 251:
          return "IXFR";
        case 41:
          return "OPT";
        case 255:
          return "ANY";
      }
      return "UNKNOWN_" + type;
    };
    exports2.toType = function(name) {
      switch (name.toUpperCase()) {
        case "A":
          return 1;
        case "NULL":
          return 10;
        case "AAAA":
          return 28;
        case "AFSDB":
          return 18;
        case "APL":
          return 42;
        case "CAA":
          return 257;
        case "CDNSKEY":
          return 60;
        case "CDS":
          return 59;
        case "CERT":
          return 37;
        case "CNAME":
          return 5;
        case "DHCID":
          return 49;
        case "DLV":
          return 32769;
        case "DNAME":
          return 39;
        case "DNSKEY":
          return 48;
        case "DS":
          return 43;
        case "HIP":
          return 55;
        case "HINFO":
          return 13;
        case "IPSECKEY":
          return 45;
        case "KEY":
          return 25;
        case "KX":
          return 36;
        case "LOC":
          return 29;
        case "MX":
          return 15;
        case "NAPTR":
          return 35;
        case "NS":
          return 2;
        case "NSEC":
          return 47;
        case "NSEC3":
          return 50;
        case "NSEC3PARAM":
          return 51;
        case "PTR":
          return 12;
        case "RRSIG":
          return 46;
        case "RP":
          return 17;
        case "SIG":
          return 24;
        case "SOA":
          return 6;
        case "SPF":
          return 99;
        case "SRV":
          return 33;
        case "SSHFP":
          return 44;
        case "TA":
          return 32768;
        case "TKEY":
          return 249;
        case "TLSA":
          return 52;
        case "TSIG":
          return 250;
        case "TXT":
          return 16;
        case "AXFR":
          return 252;
        case "IXFR":
          return 251;
        case "OPT":
          return 41;
        case "ANY":
          return 255;
        case "*":
          return 255;
      }
      if (name.toUpperCase().startsWith("UNKNOWN_")) return parseInt(name.slice(8));
      return 0;
    };
  }
});

// node_modules/dns-packet/rcodes.js
var require_rcodes = __commonJS({
  "node_modules/dns-packet/rcodes.js"(exports2) {
    "use strict";
    exports2.toString = function(rcode) {
      switch (rcode) {
        case 0:
          return "NOERROR";
        case 1:
          return "FORMERR";
        case 2:
          return "SERVFAIL";
        case 3:
          return "NXDOMAIN";
        case 4:
          return "NOTIMP";
        case 5:
          return "REFUSED";
        case 6:
          return "YXDOMAIN";
        case 7:
          return "YXRRSET";
        case 8:
          return "NXRRSET";
        case 9:
          return "NOTAUTH";
        case 10:
          return "NOTZONE";
        case 11:
          return "RCODE_11";
        case 12:
          return "RCODE_12";
        case 13:
          return "RCODE_13";
        case 14:
          return "RCODE_14";
        case 15:
          return "RCODE_15";
      }
      return "RCODE_" + rcode;
    };
    exports2.toRcode = function(code) {
      switch (code.toUpperCase()) {
        case "NOERROR":
          return 0;
        case "FORMERR":
          return 1;
        case "SERVFAIL":
          return 2;
        case "NXDOMAIN":
          return 3;
        case "NOTIMP":
          return 4;
        case "REFUSED":
          return 5;
        case "YXDOMAIN":
          return 6;
        case "YXRRSET":
          return 7;
        case "NXRRSET":
          return 8;
        case "NOTAUTH":
          return 9;
        case "NOTZONE":
          return 10;
        case "RCODE_11":
          return 11;
        case "RCODE_12":
          return 12;
        case "RCODE_13":
          return 13;
        case "RCODE_14":
          return 14;
        case "RCODE_15":
          return 15;
      }
      return 0;
    };
  }
});

// node_modules/dns-packet/opcodes.js
var require_opcodes = __commonJS({
  "node_modules/dns-packet/opcodes.js"(exports2) {
    "use strict";
    exports2.toString = function(opcode) {
      switch (opcode) {
        case 0:
          return "QUERY";
        case 1:
          return "IQUERY";
        case 2:
          return "STATUS";
        case 3:
          return "OPCODE_3";
        case 4:
          return "NOTIFY";
        case 5:
          return "UPDATE";
        case 6:
          return "OPCODE_6";
        case 7:
          return "OPCODE_7";
        case 8:
          return "OPCODE_8";
        case 9:
          return "OPCODE_9";
        case 10:
          return "OPCODE_10";
        case 11:
          return "OPCODE_11";
        case 12:
          return "OPCODE_12";
        case 13:
          return "OPCODE_13";
        case 14:
          return "OPCODE_14";
        case 15:
          return "OPCODE_15";
      }
      return "OPCODE_" + opcode;
    };
    exports2.toOpcode = function(code) {
      switch (code.toUpperCase()) {
        case "QUERY":
          return 0;
        case "IQUERY":
          return 1;
        case "STATUS":
          return 2;
        case "OPCODE_3":
          return 3;
        case "NOTIFY":
          return 4;
        case "UPDATE":
          return 5;
        case "OPCODE_6":
          return 6;
        case "OPCODE_7":
          return 7;
        case "OPCODE_8":
          return 8;
        case "OPCODE_9":
          return 9;
        case "OPCODE_10":
          return 10;
        case "OPCODE_11":
          return 11;
        case "OPCODE_12":
          return 12;
        case "OPCODE_13":
          return 13;
        case "OPCODE_14":
          return 14;
        case "OPCODE_15":
          return 15;
      }
      return 0;
    };
  }
});

// node_modules/dns-packet/classes.js
var require_classes = __commonJS({
  "node_modules/dns-packet/classes.js"(exports2) {
    "use strict";
    exports2.toString = function(klass) {
      switch (klass) {
        case 1:
          return "IN";
        case 2:
          return "CS";
        case 3:
          return "CH";
        case 4:
          return "HS";
        case 255:
          return "ANY";
      }
      return "UNKNOWN_" + klass;
    };
    exports2.toClass = function(name) {
      switch (name.toUpperCase()) {
        case "IN":
          return 1;
        case "CS":
          return 2;
        case "CH":
          return 3;
        case "HS":
          return 4;
        case "ANY":
          return 255;
      }
      return 0;
    };
  }
});

// node_modules/dns-packet/optioncodes.js
var require_optioncodes = __commonJS({
  "node_modules/dns-packet/optioncodes.js"(exports2) {
    "use strict";
    exports2.toString = function(type) {
      switch (type) {
        // list at
        // https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-11
        case 1:
          return "LLQ";
        case 2:
          return "UL";
        case 3:
          return "NSID";
        case 5:
          return "DAU";
        case 6:
          return "DHU";
        case 7:
          return "N3U";
        case 8:
          return "CLIENT_SUBNET";
        case 9:
          return "EXPIRE";
        case 10:
          return "COOKIE";
        case 11:
          return "TCP_KEEPALIVE";
        case 12:
          return "PADDING";
        case 13:
          return "CHAIN";
        case 14:
          return "KEY_TAG";
        case 26946:
          return "DEVICEID";
      }
      if (type < 0) {
        return null;
      }
      return `OPTION_${type}`;
    };
    exports2.toCode = function(name) {
      if (typeof name === "number") {
        return name;
      }
      if (!name) {
        return -1;
      }
      switch (name.toUpperCase()) {
        case "OPTION_0":
          return 0;
        case "LLQ":
          return 1;
        case "UL":
          return 2;
        case "NSID":
          return 3;
        case "OPTION_4":
          return 4;
        case "DAU":
          return 5;
        case "DHU":
          return 6;
        case "N3U":
          return 7;
        case "CLIENT_SUBNET":
          return 8;
        case "EXPIRE":
          return 9;
        case "COOKIE":
          return 10;
        case "TCP_KEEPALIVE":
          return 11;
        case "PADDING":
          return 12;
        case "CHAIN":
          return 13;
        case "KEY_TAG":
          return 14;
        case "DEVICEID":
          return 26946;
        case "OPTION_65535":
          return 65535;
      }
      const m = name.match(/_(\d+)$/);
      if (m) {
        return parseInt(m[1], 10);
      }
      return -1;
    };
  }
});

// node_modules/@leichtgewicht/ip-codec/index.cjs
var require_ip_codec = __commonJS({
  "node_modules/@leichtgewicht/ip-codec/index.cjs"(exports2, module2) {
    var ipCodec = (function(exports3) {
      "use strict";
      Object.defineProperty(exports3, "__esModule", {
        value: true
      });
      exports3.decode = decode;
      exports3.encode = encode;
      exports3.familyOf = familyOf;
      exports3.name = void 0;
      exports3.sizeOf = sizeOf;
      exports3.v6 = exports3.v4 = void 0;
      const v4Regex = /^(\d{1,3}\.){3,3}\d{1,3}$/;
      const v4Size = 4;
      const v6Regex = /^(::)?(((\d{1,3}\.){3}(\d{1,3}){1})?([0-9a-f]){0,4}:{0,2}){1,8}(::)?$/i;
      const v6Size = 16;
      const v4 = {
        name: "v4",
        size: v4Size,
        isFormat: (ip) => v4Regex.test(ip),
        encode(ip, buff, offset) {
          offset = ~~offset;
          buff = buff || new Uint8Array(offset + v4Size);
          const max = ip.length;
          let n = 0;
          for (let i = 0; i < max; ) {
            const c = ip.charCodeAt(i++);
            if (c === 46) {
              buff[offset++] = n;
              n = 0;
            } else {
              n = n * 10 + (c - 48);
            }
          }
          buff[offset] = n;
          return buff;
        },
        decode(buff, offset) {
          offset = ~~offset;
          return `${buff[offset++]}.${buff[offset++]}.${buff[offset++]}.${buff[offset]}`;
        }
      };
      exports3.v4 = v4;
      const v6 = {
        name: "v6",
        size: v6Size,
        isFormat: (ip) => ip.length > 0 && v6Regex.test(ip),
        encode(ip, buff, offset) {
          offset = ~~offset;
          let end = offset + v6Size;
          let fill = -1;
          let hexN = 0;
          let decN = 0;
          let prevColon = true;
          let useDec = false;
          buff = buff || new Uint8Array(offset + v6Size);
          for (let i = 0; i < ip.length; i++) {
            let c = ip.charCodeAt(i);
            if (c === 58) {
              if (prevColon) {
                if (fill !== -1) {
                  if (offset < end) buff[offset] = 0;
                  if (offset < end - 1) buff[offset + 1] = 0;
                  offset += 2;
                } else if (offset < end) {
                  fill = offset;
                }
              } else {
                if (useDec === true) {
                  if (offset < end) buff[offset] = decN;
                  offset++;
                } else {
                  if (offset < end) buff[offset] = hexN >> 8;
                  if (offset < end - 1) buff[offset + 1] = hexN & 255;
                  offset += 2;
                }
                hexN = 0;
                decN = 0;
              }
              prevColon = true;
              useDec = false;
            } else if (c === 46) {
              if (offset < end) buff[offset] = decN;
              offset++;
              decN = 0;
              hexN = 0;
              prevColon = false;
              useDec = true;
            } else {
              prevColon = false;
              if (c >= 97) {
                c -= 87;
              } else if (c >= 65) {
                c -= 55;
              } else {
                c -= 48;
                decN = decN * 10 + c;
              }
              hexN = (hexN << 4) + c;
            }
          }
          if (prevColon === false) {
            if (useDec === true) {
              if (offset < end) buff[offset] = decN;
              offset++;
            } else {
              if (offset < end) buff[offset] = hexN >> 8;
              if (offset < end - 1) buff[offset + 1] = hexN & 255;
              offset += 2;
            }
          } else if (fill === 0) {
            if (offset < end) buff[offset] = 0;
            if (offset < end - 1) buff[offset + 1] = 0;
            offset += 2;
          } else if (fill !== -1) {
            offset += 2;
            for (let i = Math.min(offset - 1, end - 1); i >= fill + 2; i--) {
              buff[i] = buff[i - 2];
            }
            buff[fill] = 0;
            buff[fill + 1] = 0;
            fill = offset;
          }
          if (fill !== offset && fill !== -1) {
            if (offset > end - 2) {
              offset = end - 2;
            }
            while (end > fill) {
              buff[--end] = offset < end && offset > fill ? buff[--offset] : 0;
            }
          } else {
            while (offset < end) {
              buff[offset++] = 0;
            }
          }
          return buff;
        },
        decode(buff, offset) {
          offset = ~~offset;
          let result = "";
          for (let i = 0; i < v6Size; i += 2) {
            if (i !== 0) {
              result += ":";
            }
            result += (buff[offset + i] << 8 | buff[offset + i + 1]).toString(16);
          }
          return result.replace(/(^|:)0(:0)*:0(:|$)/, "$1::$3").replace(/:{3,4}/, "::");
        }
      };
      exports3.v6 = v6;
      const name = "ip";
      exports3.name = name;
      function sizeOf(ip) {
        if (v4.isFormat(ip)) return v4.size;
        if (v6.isFormat(ip)) return v6.size;
        throw Error(`Invalid ip address: ${ip}`);
      }
      function familyOf(string) {
        return sizeOf(string) === v4.size ? 1 : 2;
      }
      function encode(ip, buff, offset) {
        offset = ~~offset;
        const size = sizeOf(ip);
        if (typeof buff === "function") {
          buff = buff(offset + size);
        }
        if (size === v4.size) {
          return v4.encode(ip, buff, offset);
        }
        return v6.encode(ip, buff, offset);
      }
      function decode(buff, offset, length) {
        offset = ~~offset;
        length = length || buff.length - offset;
        if (length === v4.size) {
          return v4.decode(buff, offset, length);
        }
        if (length === v6.size) {
          return v6.decode(buff, offset, length);
        }
        throw Error(`Invalid buffer size needs to be ${v4.size} for v4 or ${v6.size} for v6.`);
      }
      return "default" in exports3 ? exports3.default : exports3;
    })({});
    if (typeof define === "function" && define.amd) define([], function() {
      return ipCodec;
    });
    else if (typeof module2 === "object" && typeof exports2 === "object") module2.exports = ipCodec;
  }
});

// node_modules/dns-packet/index.js
var require_dns_packet = __commonJS({
  "node_modules/dns-packet/index.js"(exports2) {
    "use strict";
    var Buffer3 = require("buffer").Buffer;
    var types = require_types();
    var rcodes = require_rcodes();
    var opcodes = require_opcodes();
    var classes = require_classes();
    var optioncodes = require_optioncodes();
    var ip = require_ip_codec();
    var QUERY_FLAG = 0;
    var RESPONSE_FLAG = 1 << 15;
    var FLUSH_MASK = 1 << 15;
    var NOT_FLUSH_MASK = ~FLUSH_MASK;
    var QU_MASK = 1 << 15;
    var NOT_QU_MASK = ~QU_MASK;
    var name = exports2.name = {};
    name.encode = function(str, buf, offset, { mail = false } = {}) {
      if (!buf) buf = Buffer3.alloc(name.encodingLength(str));
      if (!offset) offset = 0;
      const oldOffset = offset;
      const n = str.replace(/^\.|\.$/gm, "");
      if (n.length) {
        let list = [];
        if (mail) {
          let localPart = "";
          n.split(".").forEach((label) => {
            if (label.endsWith("\\")) {
              localPart += (localPart.length ? "." : "") + label.slice(0, -1);
            } else {
              if (list.length === 0 && localPart.length) {
                list.push(localPart + "." + label);
              } else {
                list.push(label);
              }
            }
          });
        } else {
          list = n.split(".");
        }
        for (let i = 0; i < list.length; i++) {
          const len = buf.write(list[i], offset + 1);
          buf[offset] = len;
          offset += len + 1;
        }
      }
      buf[offset++] = 0;
      name.encode.bytes = offset - oldOffset;
      return buf;
    };
    name.encode.bytes = 0;
    name.decode = function(buf, offset, { mail = false } = {}) {
      if (!offset) offset = 0;
      const list = [];
      let oldOffset = offset;
      let totalLength = 0;
      let consumedBytes = 0;
      let jumped = false;
      while (true) {
        if (offset >= buf.length) {
          throw new Error("Cannot decode name (buffer overflow)");
        }
        const len = buf[offset++];
        consumedBytes += jumped ? 0 : 1;
        if (len === 0) {
          break;
        } else if ((len & 192) === 0) {
          if (offset + len > buf.length) {
            throw new Error("Cannot decode name (buffer overflow)");
          }
          totalLength += len + 1;
          if (totalLength > 254) {
            throw new Error("Cannot decode name (name too long)");
          }
          let label = buf.toString("utf-8", offset, offset + len);
          if (mail) {
            label = label.replace(/\./g, "\\.");
          }
          list.push(label);
          offset += len;
          consumedBytes += jumped ? 0 : len;
        } else if ((len & 192) === 192) {
          if (offset + 1 > buf.length) {
            throw new Error("Cannot decode name (buffer overflow)");
          }
          const jumpOffset = buf.readUInt16BE(offset - 1) - 49152;
          if (jumpOffset >= oldOffset) {
            throw new Error("Cannot decode name (bad pointer)");
          }
          offset = jumpOffset;
          oldOffset = jumpOffset;
          consumedBytes += jumped ? 0 : 1;
          jumped = true;
        } else {
          throw new Error("Cannot decode name (bad label)");
        }
      }
      name.decode.bytes = consumedBytes;
      return list.length === 0 ? "." : list.join(".");
    };
    name.decode.bytes = 0;
    name.encodingLength = function(n) {
      if (n === "." || n === "..") return 1;
      return Buffer3.byteLength(n.replace(/^\.|\.$/gm, "")) + 2;
    };
    var string = {};
    string.encode = function(s, buf, offset) {
      if (!buf) buf = Buffer3.alloc(string.encodingLength(s));
      if (!offset) offset = 0;
      const len = buf.write(s, offset + 1);
      buf[offset] = len;
      string.encode.bytes = len + 1;
      return buf;
    };
    string.encode.bytes = 0;
    string.decode = function(buf, offset) {
      if (!offset) offset = 0;
      const len = buf[offset];
      const s = buf.toString("utf-8", offset + 1, offset + 1 + len);
      string.decode.bytes = len + 1;
      return s;
    };
    string.decode.bytes = 0;
    string.encodingLength = function(s) {
      return Buffer3.byteLength(s) + 1;
    };
    var header = {};
    header.encode = function(h, buf, offset) {
      if (!buf) buf = header.encodingLength(h);
      if (!offset) offset = 0;
      const flags = (h.flags || 0) & 32767;
      const type = h.type === "response" ? RESPONSE_FLAG : QUERY_FLAG;
      buf.writeUInt16BE(h.id || 0, offset);
      buf.writeUInt16BE(flags | type, offset + 2);
      buf.writeUInt16BE(h.questions.length, offset + 4);
      buf.writeUInt16BE(h.answers.length, offset + 6);
      buf.writeUInt16BE(h.authorities.length, offset + 8);
      buf.writeUInt16BE(h.additionals.length, offset + 10);
      return buf;
    };
    header.encode.bytes = 12;
    header.decode = function(buf, offset) {
      if (!offset) offset = 0;
      if (buf.length < 12) throw new Error("Header must be 12 bytes");
      const flags = buf.readUInt16BE(offset + 2);
      return {
        id: buf.readUInt16BE(offset),
        type: flags & RESPONSE_FLAG ? "response" : "query",
        flags: flags & 32767,
        flag_qr: (flags >> 15 & 1) === 1,
        opcode: opcodes.toString(flags >> 11 & 15),
        flag_aa: (flags >> 10 & 1) === 1,
        flag_tc: (flags >> 9 & 1) === 1,
        flag_rd: (flags >> 8 & 1) === 1,
        flag_ra: (flags >> 7 & 1) === 1,
        flag_z: (flags >> 6 & 1) === 1,
        flag_ad: (flags >> 5 & 1) === 1,
        flag_cd: (flags >> 4 & 1) === 1,
        rcode: rcodes.toString(flags & 15),
        questions: new Array(buf.readUInt16BE(offset + 4)),
        answers: new Array(buf.readUInt16BE(offset + 6)),
        authorities: new Array(buf.readUInt16BE(offset + 8)),
        additionals: new Array(buf.readUInt16BE(offset + 10))
      };
    };
    header.decode.bytes = 12;
    header.encodingLength = function() {
      return 12;
    };
    var runknown = exports2.unknown = {};
    runknown.encode = function(data, buf, offset) {
      if (!buf) buf = Buffer3.alloc(runknown.encodingLength(data));
      if (!offset) offset = 0;
      buf.writeUInt16BE(data.length, offset);
      data.copy(buf, offset + 2);
      runknown.encode.bytes = data.length + 2;
      return buf;
    };
    runknown.encode.bytes = 0;
    runknown.decode = function(buf, offset) {
      if (!offset) offset = 0;
      const len = buf.readUInt16BE(offset);
      const data = buf.slice(offset + 2, offset + 2 + len);
      runknown.decode.bytes = len + 2;
      return data;
    };
    runknown.decode.bytes = 0;
    runknown.encodingLength = function(data) {
      return data.length + 2;
    };
    var rns = exports2.ns = {};
    rns.encode = function(data, buf, offset) {
      if (!buf) buf = Buffer3.alloc(rns.encodingLength(data));
      if (!offset) offset = 0;
      name.encode(data, buf, offset + 2);
      buf.writeUInt16BE(name.encode.bytes, offset);
      rns.encode.bytes = name.encode.bytes + 2;
      return buf;
    };
    rns.encode.bytes = 0;
    rns.decode = function(buf, offset) {
      if (!offset) offset = 0;
      const len = buf.readUInt16BE(offset);
      const dd = name.decode(buf, offset + 2);
      rns.decode.bytes = len + 2;
      return dd;
    };
    rns.decode.bytes = 0;
    rns.encodingLength = function(data) {
      return name.encodingLength(data) + 2;
    };
    var rsoa = exports2.soa = {};
    rsoa.encode = function(data, buf, offset) {
      if (!buf) buf = Buffer3.alloc(rsoa.encodingLength(data));
      if (!offset) offset = 0;
      const oldOffset = offset;
      offset += 2;
      name.encode(data.mname, buf, offset);
      offset += name.encode.bytes;
      name.encode(data.rname, buf, offset, { mail: true });
      offset += name.encode.bytes;
      buf.writeUInt32BE(data.serial || 0, offset);
      offset += 4;
      buf.writeUInt32BE(data.refresh || 0, offset);
      offset += 4;
      buf.writeUInt32BE(data.retry || 0, offset);
      offset += 4;
      buf.writeUInt32BE(data.expire || 0, offset);
      offset += 4;
      buf.writeUInt32BE(data.minimum || 0, offset);
      offset += 4;
      buf.writeUInt16BE(offset - oldOffset - 2, oldOffset);
      rsoa.encode.bytes = offset - oldOffset;
      return buf;
    };
    rsoa.encode.bytes = 0;
    rsoa.decode = function(buf, offset) {
      if (!offset) offset = 0;
      const oldOffset = offset;
      const data = {};
      offset += 2;
      data.mname = name.decode(buf, offset);
      offset += name.decode.bytes;
      data.rname = name.decode(buf, offset, { mail: true });
      offset += name.decode.bytes;
      data.serial = buf.readUInt32BE(offset);
      offset += 4;
      data.refresh = buf.readUInt32BE(offset);
      offset += 4;
      data.retry = buf.readUInt32BE(offset);
      offset += 4;
      data.expire = buf.readUInt32BE(offset);
      offset += 4;
      data.minimum = buf.readUInt32BE(offset);
      offset += 4;
      rsoa.decode.bytes = offset - oldOffset;
      return data;
    };
    rsoa.decode.bytes = 0;
    rsoa.encodingLength = function(data) {
      return 22 + name.encodingLength(data.mname) + name.encodingLength(data.rname);
    };
    var rtxt = exports2.txt = {};
    rtxt.encode = function(data, buf, offset) {
      if (!Array.isArray(data)) data = [data];
      for (let i = 0; i < data.length; i++) {
        if (typeof data[i] === "string") {
          data[i] = Buffer3.from(data[i]);
        }
        if (!Buffer3.isBuffer(data[i])) {
          throw new Error("Must be a Buffer");
        }
      }
      if (!buf) buf = Buffer3.alloc(rtxt.encodingLength(data));
      if (!offset) offset = 0;
      const oldOffset = offset;
      offset += 2;
      data.forEach(function(d) {
        buf[offset++] = d.length;
        d.copy(buf, offset, 0, d.length);
        offset += d.length;
      });
      buf.writeUInt16BE(offset - oldOffset - 2, oldOffset);
      rtxt.encode.bytes = offset - oldOffset;
      return buf;
    };
    rtxt.encode.bytes = 0;
    rtxt.decode = function(buf, offset) {
      if (!offset) offset = 0;
      const oldOffset = offset;
      let remaining = buf.readUInt16BE(offset);
      offset += 2;
      let data = [];
      while (remaining > 0) {
        const len = buf[offset++];
        --remaining;
        if (remaining < len) {
          throw new Error("Buffer overflow");
        }
        data.push(buf.slice(offset, offset + len));
        offset += len;
        remaining -= len;
      }
      rtxt.decode.bytes = offset - oldOffset;
      return data;
    };
    rtxt.decode.bytes = 0;
    rtxt.encodingLength = function(data) {
      if (!Array.isArray(data)) data = [data];
      let length = 2;
      data.forEach(function(buf) {
        if (typeof buf === "string") {
          length += Buffer3.byteLength(buf) + 1;
        } else {
          length += buf.length + 1;
        }
      });
      return length;
    };
    var rnull = exports2.null = {};
    rnull.encode = function(data, buf, offset) {
      if (!buf) buf = Buffer3.alloc(rnull.encodingLength(data));
      if (!offset) offset = 0;
      if (typeof data === "string") data = Buffer3.from(data);
      if (!data) data = Buffer3.alloc(0);
      const oldOffset = offset;
      offset += 2;
      const len = data.length;
      data.copy(buf, offset, 0, len);
      offset += len;
      buf.writeUInt16BE(offset - oldOffset - 2, oldOffset);
      rnull.encode.bytes = offset - oldOffset;
      return buf;
    };
    rnull.encode.bytes = 0;
    rnull.decode = function(buf, offset) {
      if (!offset) offset = 0;
      const oldOffset = offset;
      const len = buf.readUInt16BE(offset);
      offset += 2;
      const data = buf.slice(offset, offset + len);
      offset += len;
      rnull.decode.bytes = offset - oldOffset;
      return data;
    };
    rnull.decode.bytes = 0;
    rnull.encodingLength = function(data) {
      if (!data) return 2;
      return (Buffer3.isBuffer(data) ? data.length : Buffer3.byteLength(data)) + 2;
    };
    var rhinfo = exports2.hinfo = {};
    rhinfo.encode = function(data, buf, offset) {
      if (!buf) buf = Buffer3.alloc(rhinfo.encodingLength(data));
      if (!offset) offset = 0;
      const oldOffset = offset;
      offset += 2;
      string.encode(data.cpu, buf, offset);
      offset += string.encode.bytes;
      string.encode(data.os, buf, offset);
      offset += string.encode.bytes;
      buf.writeUInt16BE(offset - oldOffset - 2, oldOffset);
      rhinfo.encode.bytes = offset - oldOffset;
      return buf;
    };
    rhinfo.encode.bytes = 0;
    rhinfo.decode = function(buf, offset) {
      if (!offset) offset = 0;
      const oldOffset = offset;
      const data = {};
      offset += 2;
      data.cpu = string.decode(buf, offset);
      offset += string.decode.bytes;
      data.os = string.decode(buf, offset);
      offset += string.decode.bytes;
      rhinfo.decode.bytes = offset - oldOffset;
      return data;
    };
    rhinfo.decode.bytes = 0;
    rhinfo.encodingLength = function(data) {
      return string.encodingLength(data.cpu) + string.encodingLength(data.os) + 2;
    };
    var rptr = exports2.ptr = {};
    var rcname = exports2.cname = rptr;
    var rdname = exports2.dname = rptr;
    rptr.encode = function(data, buf, offset) {
      if (!buf) buf = Buffer3.alloc(rptr.encodingLength(data));
      if (!offset) offset = 0;
      name.encode(data, buf, offset + 2);
      buf.writeUInt16BE(name.encode.bytes, offset);
      rptr.encode.bytes = name.encode.bytes + 2;
      return buf;
    };
    rptr.encode.bytes = 0;
    rptr.decode = function(buf, offset) {
      if (!offset) offset = 0;
      const data = name.decode(buf, offset + 2);
      rptr.decode.bytes = name.decode.bytes + 2;
      return data;
    };
    rptr.decode.bytes = 0;
    rptr.encodingLength = function(data) {
      return name.encodingLength(data) + 2;
    };
    var rsrv = exports2.srv = {};
    rsrv.encode = function(data, buf, offset) {
      if (!buf) buf = Buffer3.alloc(rsrv.encodingLength(data));
      if (!offset) offset = 0;
      buf.writeUInt16BE(data.priority || 0, offset + 2);
      buf.writeUInt16BE(data.weight || 0, offset + 4);
      buf.writeUInt16BE(data.port || 0, offset + 6);
      name.encode(data.target, buf, offset + 8);
      const len = name.encode.bytes + 6;
      buf.writeUInt16BE(len, offset);
      rsrv.encode.bytes = len + 2;
      return buf;
    };
    rsrv.encode.bytes = 0;
    rsrv.decode = function(buf, offset) {
      if (!offset) offset = 0;
      const len = buf.readUInt16BE(offset);
      const data = {};
      data.priority = buf.readUInt16BE(offset + 2);
      data.weight = buf.readUInt16BE(offset + 4);
      data.port = buf.readUInt16BE(offset + 6);
      data.target = name.decode(buf, offset + 8);
      rsrv.decode.bytes = len + 2;
      return data;
    };
    rsrv.decode.bytes = 0;
    rsrv.encodingLength = function(data) {
      return 8 + name.encodingLength(data.target);
    };
    var rcaa = exports2.caa = {};
    rcaa.ISSUER_CRITICAL = 1 << 7;
    rcaa.encode = function(data, buf, offset) {
      const len = rcaa.encodingLength(data);
      if (!buf) buf = Buffer3.alloc(rcaa.encodingLength(data));
      if (!offset) offset = 0;
      if (data.issuerCritical) {
        data.flags = rcaa.ISSUER_CRITICAL;
      }
      buf.writeUInt16BE(len - 2, offset);
      offset += 2;
      buf.writeUInt8(data.flags || 0, offset);
      offset += 1;
      string.encode(data.tag, buf, offset);
      offset += string.encode.bytes;
      buf.write(data.value, offset);
      offset += Buffer3.byteLength(data.value);
      rcaa.encode.bytes = len;
      return buf;
    };
    rcaa.encode.bytes = 0;
    rcaa.decode = function(buf, offset) {
      if (!offset) offset = 0;
      const len = buf.readUInt16BE(offset);
      offset += 2;
      const oldOffset = offset;
      const data = {};
      data.flags = buf.readUInt8(offset);
      offset += 1;
      data.tag = string.decode(buf, offset);
      offset += string.decode.bytes;
      data.value = buf.toString("utf-8", offset, oldOffset + len);
      data.issuerCritical = !!(data.flags & rcaa.ISSUER_CRITICAL);
      rcaa.decode.bytes = len + 2;
      return data;
    };
    rcaa.decode.bytes = 0;
    rcaa.encodingLength = function(data) {
      return string.encodingLength(data.tag) + string.encodingLength(data.value) + 2;
    };
    var rmx = exports2.mx = {};
    rmx.encode = function(data, buf, offset) {
      if (!buf) buf = Buffer3.alloc(rmx.encodingLength(data));
      if (!offset) offset = 0;
      const oldOffset = offset;
      offset += 2;
      buf.writeUInt16BE(data.preference || 0, offset);
      offset += 2;
      name.encode(data.exchange, buf, offset);
      offset += name.encode.bytes;
      buf.writeUInt16BE(offset - oldOffset - 2, oldOffset);
      rmx.encode.bytes = offset - oldOffset;
      return buf;
    };
    rmx.encode.bytes = 0;
    rmx.decode = function(buf, offset) {
      if (!offset) offset = 0;
      const oldOffset = offset;
      const data = {};
      offset += 2;
      data.preference = buf.readUInt16BE(offset);
      offset += 2;
      data.exchange = name.decode(buf, offset);
      offset += name.decode.bytes;
      rmx.decode.bytes = offset - oldOffset;
      return data;
    };
    rmx.encodingLength = function(data) {
      return 4 + name.encodingLength(data.exchange);
    };
    var ra = exports2.a = {};
    ra.encode = function(host, buf, offset) {
      if (!buf) buf = Buffer3.alloc(ra.encodingLength(host));
      if (!offset) offset = 0;
      buf.writeUInt16BE(4, offset);
      offset += 2;
      ip.v4.encode(host, buf, offset);
      ra.encode.bytes = 6;
      return buf;
    };
    ra.encode.bytes = 0;
    ra.decode = function(buf, offset) {
      if (!offset) offset = 0;
      offset += 2;
      const host = ip.v4.decode(buf, offset);
      ra.decode.bytes = 6;
      return host;
    };
    ra.decode.bytes = 0;
    ra.encodingLength = function() {
      return 6;
    };
    var raaaa = exports2.aaaa = {};
    raaaa.encode = function(host, buf, offset) {
      if (!buf) buf = Buffer3.alloc(raaaa.encodingLength(host));
      if (!offset) offset = 0;
      buf.writeUInt16BE(16, offset);
      offset += 2;
      ip.v6.encode(host, buf, offset);
      raaaa.encode.bytes = 18;
      return buf;
    };
    raaaa.encode.bytes = 0;
    raaaa.decode = function(buf, offset) {
      if (!offset) offset = 0;
      offset += 2;
      const host = ip.v6.decode(buf, offset);
      raaaa.decode.bytes = 18;
      return host;
    };
    raaaa.decode.bytes = 0;
    raaaa.encodingLength = function() {
      return 18;
    };
    var roption = exports2.option = {};
    roption.encode = function(option, buf, offset) {
      if (!buf) buf = Buffer3.alloc(roption.encodingLength(option));
      if (!offset) offset = 0;
      const oldOffset = offset;
      const code = optioncodes.toCode(option.code);
      buf.writeUInt16BE(code, offset);
      offset += 2;
      if (option.data) {
        buf.writeUInt16BE(option.data.length, offset);
        offset += 2;
        option.data.copy(buf, offset);
        offset += option.data.length;
      } else {
        switch (code) {
          // case 3: NSID.  No encode makes sense.
          // case 5,6,7: Not implementable
          case 8:
            const spl = option.sourcePrefixLength || 0;
            const fam = option.family || ip.familyOf(option.ip);
            const ipBuf = ip.encode(option.ip, Buffer3.alloc);
            const ipLen = Math.ceil(spl / 8);
            buf.writeUInt16BE(ipLen + 4, offset);
            offset += 2;
            buf.writeUInt16BE(fam, offset);
            offset += 2;
            buf.writeUInt8(spl, offset++);
            buf.writeUInt8(option.scopePrefixLength || 0, offset++);
            ipBuf.copy(buf, offset, 0, ipLen);
            offset += ipLen;
            break;
          // case 9: EXPIRE (experimental)
          // case 10: COOKIE.  No encode makes sense.
          case 11:
            if (option.timeout) {
              buf.writeUInt16BE(2, offset);
              offset += 2;
              buf.writeUInt16BE(option.timeout, offset);
              offset += 2;
            } else {
              buf.writeUInt16BE(0, offset);
              offset += 2;
            }
            break;
          case 12:
            const len = option.length || 0;
            buf.writeUInt16BE(len, offset);
            offset += 2;
            buf.fill(0, offset, offset + len);
            offset += len;
            break;
          // case 13:  CHAIN.  Experimental.
          case 14:
            const tagsLen = option.tags.length * 2;
            buf.writeUInt16BE(tagsLen, offset);
            offset += 2;
            for (const tag of option.tags) {
              buf.writeUInt16BE(tag, offset);
              offset += 2;
            }
            break;
          default:
            throw new Error(`Unknown roption code: ${option.code}`);
        }
      }
      roption.encode.bytes = offset - oldOffset;
      return buf;
    };
    roption.encode.bytes = 0;
    roption.decode = function(buf, offset) {
      if (!offset) offset = 0;
      const option = {};
      option.code = buf.readUInt16BE(offset);
      option.type = optioncodes.toString(option.code);
      offset += 2;
      const len = buf.readUInt16BE(offset);
      offset += 2;
      option.data = buf.slice(offset, offset + len);
      switch (option.code) {
        // case 3: NSID.  No decode makes sense.
        case 8:
          option.family = buf.readUInt16BE(offset);
          offset += 2;
          option.sourcePrefixLength = buf.readUInt8(offset++);
          option.scopePrefixLength = buf.readUInt8(offset++);
          const padded = Buffer3.alloc(option.family === 1 ? 4 : 16);
          buf.copy(padded, 0, offset, offset + len - 4);
          option.ip = ip.decode(padded);
          break;
        // case 12: Padding.  No decode makes sense.
        case 11:
          if (len > 0) {
            option.timeout = buf.readUInt16BE(offset);
            offset += 2;
          }
          break;
        case 14:
          option.tags = [];
          for (let i = 0; i < len; i += 2) {
            option.tags.push(buf.readUInt16BE(offset));
            offset += 2;
          }
      }
      roption.decode.bytes = len + 4;
      return option;
    };
    roption.decode.bytes = 0;
    roption.encodingLength = function(option) {
      if (option.data) {
        return option.data.length + 4;
      }
      const code = optioncodes.toCode(option.code);
      switch (code) {
        case 8:
          const spl = option.sourcePrefixLength || 0;
          return Math.ceil(spl / 8) + 8;
        case 11:
          return typeof option.timeout === "number" ? 6 : 4;
        case 12:
          return option.length + 4;
        case 14:
          return 4 + option.tags.length * 2;
      }
      throw new Error(`Unknown roption code: ${option.code}`);
    };
    var ropt = exports2.opt = {};
    ropt.encode = function(options, buf, offset) {
      if (!buf) buf = Buffer3.alloc(ropt.encodingLength(options));
      if (!offset) offset = 0;
      const oldOffset = offset;
      const rdlen = encodingLengthList(options, roption);
      buf.writeUInt16BE(rdlen, offset);
      offset = encodeList(options, roption, buf, offset + 2);
      ropt.encode.bytes = offset - oldOffset;
      return buf;
    };
    ropt.encode.bytes = 0;
    ropt.decode = function(buf, offset) {
      if (!offset) offset = 0;
      const oldOffset = offset;
      const options = [];
      let rdlen = buf.readUInt16BE(offset);
      offset += 2;
      let o = 0;
      while (rdlen > 0) {
        options[o++] = roption.decode(buf, offset);
        offset += roption.decode.bytes;
        rdlen -= roption.decode.bytes;
      }
      ropt.decode.bytes = offset - oldOffset;
      return options;
    };
    ropt.decode.bytes = 0;
    ropt.encodingLength = function(options) {
      return 2 + encodingLengthList(options || [], roption);
    };
    var rdnskey = exports2.dnskey = {};
    rdnskey.PROTOCOL_DNSSEC = 3;
    rdnskey.ZONE_KEY = 128;
    rdnskey.SECURE_ENTRYPOINT = 32768;
    rdnskey.encode = function(key, buf, offset) {
      if (!buf) buf = Buffer3.alloc(rdnskey.encodingLength(key));
      if (!offset) offset = 0;
      const oldOffset = offset;
      const keydata = key.key;
      if (!Buffer3.isBuffer(keydata)) {
        throw new Error("Key must be a Buffer");
      }
      offset += 2;
      buf.writeUInt16BE(key.flags, offset);
      offset += 2;
      buf.writeUInt8(rdnskey.PROTOCOL_DNSSEC, offset);
      offset += 1;
      buf.writeUInt8(key.algorithm, offset);
      offset += 1;
      keydata.copy(buf, offset, 0, keydata.length);
      offset += keydata.length;
      rdnskey.encode.bytes = offset - oldOffset;
      buf.writeUInt16BE(rdnskey.encode.bytes - 2, oldOffset);
      return buf;
    };
    rdnskey.encode.bytes = 0;
    rdnskey.decode = function(buf, offset) {
      if (!offset) offset = 0;
      const oldOffset = offset;
      var key = {};
      var length = buf.readUInt16BE(offset);
      offset += 2;
      key.flags = buf.readUInt16BE(offset);
      offset += 2;
      if (buf.readUInt8(offset) !== rdnskey.PROTOCOL_DNSSEC) {
        throw new Error("Protocol must be 3");
      }
      offset += 1;
      key.algorithm = buf.readUInt8(offset);
      offset += 1;
      key.key = buf.slice(offset, oldOffset + length + 2);
      offset += key.key.length;
      rdnskey.decode.bytes = offset - oldOffset;
      return key;
    };
    rdnskey.decode.bytes = 0;
    rdnskey.encodingLength = function(key) {
      return 6 + Buffer3.byteLength(key.key);
    };
    var rrrsig = exports2.rrsig = {};
    rrrsig.encode = function(sig, buf, offset) {
      if (!buf) buf = Buffer3.alloc(rrrsig.encodingLength(sig));
      if (!offset) offset = 0;
      const oldOffset = offset;
      const signature = sig.signature;
      if (!Buffer3.isBuffer(signature)) {
        throw new Error("Signature must be a Buffer");
      }
      offset += 2;
      buf.writeUInt16BE(types.toType(sig.typeCovered), offset);
      offset += 2;
      buf.writeUInt8(sig.algorithm, offset);
      offset += 1;
      buf.writeUInt8(sig.labels, offset);
      offset += 1;
      buf.writeUInt32BE(sig.originalTTL, offset);
      offset += 4;
      buf.writeUInt32BE(sig.expiration, offset);
      offset += 4;
      buf.writeUInt32BE(sig.inception, offset);
      offset += 4;
      buf.writeUInt16BE(sig.keyTag, offset);
      offset += 2;
      name.encode(sig.signersName, buf, offset);
      offset += name.encode.bytes;
      signature.copy(buf, offset, 0, signature.length);
      offset += signature.length;
      rrrsig.encode.bytes = offset - oldOffset;
      buf.writeUInt16BE(rrrsig.encode.bytes - 2, oldOffset);
      return buf;
    };
    rrrsig.encode.bytes = 0;
    rrrsig.decode = function(buf, offset) {
      if (!offset) offset = 0;
      const oldOffset = offset;
      var sig = {};
      var length = buf.readUInt16BE(offset);
      offset += 2;
      sig.typeCovered = types.toString(buf.readUInt16BE(offset));
      offset += 2;
      sig.algorithm = buf.readUInt8(offset);
      offset += 1;
      sig.labels = buf.readUInt8(offset);
      offset += 1;
      sig.originalTTL = buf.readUInt32BE(offset);
      offset += 4;
      sig.expiration = buf.readUInt32BE(offset);
      offset += 4;
      sig.inception = buf.readUInt32BE(offset);
      offset += 4;
      sig.keyTag = buf.readUInt16BE(offset);
      offset += 2;
      sig.signersName = name.decode(buf, offset);
      offset += name.decode.bytes;
      sig.signature = buf.slice(offset, oldOffset + length + 2);
      offset += sig.signature.length;
      rrrsig.decode.bytes = offset - oldOffset;
      return sig;
    };
    rrrsig.decode.bytes = 0;
    rrrsig.encodingLength = function(sig) {
      return 20 + name.encodingLength(sig.signersName) + Buffer3.byteLength(sig.signature);
    };
    var rrp = exports2.rp = {};
    rrp.encode = function(data, buf, offset) {
      if (!buf) buf = Buffer3.alloc(rrp.encodingLength(data));
      if (!offset) offset = 0;
      const oldOffset = offset;
      offset += 2;
      name.encode(data.mbox || ".", buf, offset, { mail: true });
      offset += name.encode.bytes;
      name.encode(data.txt || ".", buf, offset);
      offset += name.encode.bytes;
      rrp.encode.bytes = offset - oldOffset;
      buf.writeUInt16BE(rrp.encode.bytes - 2, oldOffset);
      return buf;
    };
    rrp.encode.bytes = 0;
    rrp.decode = function(buf, offset) {
      if (!offset) offset = 0;
      const oldOffset = offset;
      const data = {};
      offset += 2;
      data.mbox = name.decode(buf, offset, { mail: true }) || ".";
      offset += name.decode.bytes;
      data.txt = name.decode(buf, offset) || ".";
      offset += name.decode.bytes;
      rrp.decode.bytes = offset - oldOffset;
      return data;
    };
    rrp.decode.bytes = 0;
    rrp.encodingLength = function(data) {
      return 2 + name.encodingLength(data.mbox || ".") + name.encodingLength(data.txt || ".");
    };
    var typebitmap = {};
    typebitmap.encode = function(typelist, buf, offset) {
      if (!buf) buf = Buffer3.alloc(typebitmap.encodingLength(typelist));
      if (!offset) offset = 0;
      const oldOffset = offset;
      var typesByWindow = [];
      for (var i = 0; i < typelist.length; i++) {
        var typeid = types.toType(typelist[i]);
        if (typesByWindow[typeid >> 8] === void 0) {
          typesByWindow[typeid >> 8] = [];
        }
        typesByWindow[typeid >> 8][typeid >> 3 & 31] |= 1 << 7 - (typeid & 7);
      }
      for (i = 0; i < typesByWindow.length; i++) {
        if (typesByWindow[i] !== void 0) {
          var windowBuf = Buffer3.from(typesByWindow[i]);
          buf.writeUInt8(i, offset);
          offset += 1;
          buf.writeUInt8(windowBuf.length, offset);
          offset += 1;
          windowBuf.copy(buf, offset);
          offset += windowBuf.length;
        }
      }
      typebitmap.encode.bytes = offset - oldOffset;
      return buf;
    };
    typebitmap.encode.bytes = 0;
    typebitmap.decode = function(buf, offset, length) {
      if (!offset) offset = 0;
      const oldOffset = offset;
      var typelist = [];
      while (offset - oldOffset < length) {
        var window2 = buf.readUInt8(offset);
        offset += 1;
        var windowLength = buf.readUInt8(offset);
        offset += 1;
        for (var i = 0; i < windowLength; i++) {
          var b = buf.readUInt8(offset + i);
          for (var j = 0; j < 8; j++) {
            if (b & 1 << 7 - j) {
              var typeid = types.toString(window2 << 8 | i << 3 | j);
              typelist.push(typeid);
            }
          }
        }
        offset += windowLength;
      }
      typebitmap.decode.bytes = offset - oldOffset;
      return typelist;
    };
    typebitmap.decode.bytes = 0;
    typebitmap.encodingLength = function(typelist) {
      var extents = [];
      for (var i = 0; i < typelist.length; i++) {
        var typeid = types.toType(typelist[i]);
        extents[typeid >> 8] = Math.max(extents[typeid >> 8] || 0, typeid & 255);
      }
      var len = 0;
      for (i = 0; i < extents.length; i++) {
        if (extents[i] !== void 0) {
          len += 2 + Math.ceil((extents[i] + 1) / 8);
        }
      }
      return len;
    };
    var rnsec = exports2.nsec = {};
    rnsec.encode = function(record, buf, offset) {
      if (!buf) buf = Buffer3.alloc(rnsec.encodingLength(record));
      if (!offset) offset = 0;
      const oldOffset = offset;
      offset += 2;
      name.encode(record.nextDomain, buf, offset);
      offset += name.encode.bytes;
      typebitmap.encode(record.rrtypes, buf, offset);
      offset += typebitmap.encode.bytes;
      rnsec.encode.bytes = offset - oldOffset;
      buf.writeUInt16BE(rnsec.encode.bytes - 2, oldOffset);
      return buf;
    };
    rnsec.encode.bytes = 0;
    rnsec.decode = function(buf, offset) {
      if (!offset) offset = 0;
      const oldOffset = offset;
      var record = {};
      var length = buf.readUInt16BE(offset);
      offset += 2;
      record.nextDomain = name.decode(buf, offset);
      offset += name.decode.bytes;
      record.rrtypes = typebitmap.decode(buf, offset, length - (offset - oldOffset));
      offset += typebitmap.decode.bytes;
      rnsec.decode.bytes = offset - oldOffset;
      return record;
    };
    rnsec.decode.bytes = 0;
    rnsec.encodingLength = function(record) {
      return 2 + name.encodingLength(record.nextDomain) + typebitmap.encodingLength(record.rrtypes);
    };
    var rnsec3 = exports2.nsec3 = {};
    rnsec3.encode = function(record, buf, offset) {
      if (!buf) buf = Buffer3.alloc(rnsec3.encodingLength(record));
      if (!offset) offset = 0;
      const oldOffset = offset;
      const salt = record.salt;
      if (!Buffer3.isBuffer(salt)) {
        throw new Error("salt must be a Buffer");
      }
      const nextDomain = record.nextDomain;
      if (!Buffer3.isBuffer(nextDomain)) {
        throw new Error("nextDomain must be a Buffer");
      }
      offset += 2;
      buf.writeUInt8(record.algorithm, offset);
      offset += 1;
      buf.writeUInt8(record.flags, offset);
      offset += 1;
      buf.writeUInt16BE(record.iterations, offset);
      offset += 2;
      buf.writeUInt8(salt.length, offset);
      offset += 1;
      salt.copy(buf, offset, 0, salt.length);
      offset += salt.length;
      buf.writeUInt8(nextDomain.length, offset);
      offset += 1;
      nextDomain.copy(buf, offset, 0, nextDomain.length);
      offset += nextDomain.length;
      typebitmap.encode(record.rrtypes, buf, offset);
      offset += typebitmap.encode.bytes;
      rnsec3.encode.bytes = offset - oldOffset;
      buf.writeUInt16BE(rnsec3.encode.bytes - 2, oldOffset);
      return buf;
    };
    rnsec3.encode.bytes = 0;
    rnsec3.decode = function(buf, offset) {
      if (!offset) offset = 0;
      const oldOffset = offset;
      var record = {};
      var length = buf.readUInt16BE(offset);
      offset += 2;
      record.algorithm = buf.readUInt8(offset);
      offset += 1;
      record.flags = buf.readUInt8(offset);
      offset += 1;
      record.iterations = buf.readUInt16BE(offset);
      offset += 2;
      const saltLength = buf.readUInt8(offset);
      offset += 1;
      record.salt = buf.slice(offset, offset + saltLength);
      offset += saltLength;
      const hashLength = buf.readUInt8(offset);
      offset += 1;
      record.nextDomain = buf.slice(offset, offset + hashLength);
      offset += hashLength;
      record.rrtypes = typebitmap.decode(buf, offset, length - (offset - oldOffset));
      offset += typebitmap.decode.bytes;
      rnsec3.decode.bytes = offset - oldOffset;
      return record;
    };
    rnsec3.decode.bytes = 0;
    rnsec3.encodingLength = function(record) {
      return 8 + record.salt.length + record.nextDomain.length + typebitmap.encodingLength(record.rrtypes);
    };
    var rds = exports2.ds = {};
    rds.encode = function(digest, buf, offset) {
      if (!buf) buf = Buffer3.alloc(rds.encodingLength(digest));
      if (!offset) offset = 0;
      const oldOffset = offset;
      const digestdata = digest.digest;
      if (!Buffer3.isBuffer(digestdata)) {
        throw new Error("Digest must be a Buffer");
      }
      offset += 2;
      buf.writeUInt16BE(digest.keyTag, offset);
      offset += 2;
      buf.writeUInt8(digest.algorithm, offset);
      offset += 1;
      buf.writeUInt8(digest.digestType, offset);
      offset += 1;
      digestdata.copy(buf, offset, 0, digestdata.length);
      offset += digestdata.length;
      rds.encode.bytes = offset - oldOffset;
      buf.writeUInt16BE(rds.encode.bytes - 2, oldOffset);
      return buf;
    };
    rds.encode.bytes = 0;
    rds.decode = function(buf, offset) {
      if (!offset) offset = 0;
      const oldOffset = offset;
      var digest = {};
      var length = buf.readUInt16BE(offset);
      offset += 2;
      digest.keyTag = buf.readUInt16BE(offset);
      offset += 2;
      digest.algorithm = buf.readUInt8(offset);
      offset += 1;
      digest.digestType = buf.readUInt8(offset);
      offset += 1;
      digest.digest = buf.slice(offset, oldOffset + length + 2);
      offset += digest.digest.length;
      rds.decode.bytes = offset - oldOffset;
      return digest;
    };
    rds.decode.bytes = 0;
    rds.encodingLength = function(digest) {
      return 6 + Buffer3.byteLength(digest.digest);
    };
    var rsshfp = exports2.sshfp = {};
    rsshfp.getFingerprintLengthForHashType = function getFingerprintLengthForHashType(hashType) {
      switch (hashType) {
        case 1:
          return 20;
        case 2:
          return 32;
      }
    };
    rsshfp.encode = function encode(record, buf, offset) {
      if (!buf) buf = Buffer3.alloc(rsshfp.encodingLength(record));
      if (!offset) offset = 0;
      const oldOffset = offset;
      offset += 2;
      buf[offset] = record.algorithm;
      offset += 1;
      buf[offset] = record.hash;
      offset += 1;
      const fingerprintBuf = Buffer3.from(record.fingerprint.toUpperCase(), "hex");
      if (fingerprintBuf.length !== rsshfp.getFingerprintLengthForHashType(record.hash)) {
        throw new Error("Invalid fingerprint length");
      }
      fingerprintBuf.copy(buf, offset);
      offset += fingerprintBuf.byteLength;
      rsshfp.encode.bytes = offset - oldOffset;
      buf.writeUInt16BE(rsshfp.encode.bytes - 2, oldOffset);
      return buf;
    };
    rsshfp.encode.bytes = 0;
    rsshfp.decode = function decode(buf, offset) {
      if (!offset) offset = 0;
      const oldOffset = offset;
      const record = {};
      offset += 2;
      record.algorithm = buf[offset];
      offset += 1;
      record.hash = buf[offset];
      offset += 1;
      const fingerprintLength = rsshfp.getFingerprintLengthForHashType(record.hash);
      record.fingerprint = buf.slice(offset, offset + fingerprintLength).toString("hex").toUpperCase();
      offset += fingerprintLength;
      rsshfp.decode.bytes = offset - oldOffset;
      return record;
    };
    rsshfp.decode.bytes = 0;
    rsshfp.encodingLength = function(record) {
      return 4 + Buffer3.from(record.fingerprint, "hex").byteLength;
    };
    var rnaptr = exports2.naptr = {};
    rnaptr.encode = function(data, buf, offset) {
      if (!buf) buf = Buffer3.alloc(rnaptr.encodingLength(data));
      if (!offset) offset = 0;
      const oldOffset = offset;
      offset += 2;
      buf.writeUInt16BE(data.order || 0, offset);
      offset += 2;
      buf.writeUInt16BE(data.preference || 0, offset);
      offset += 2;
      string.encode(data.flags, buf, offset);
      offset += string.encode.bytes;
      string.encode(data.services, buf, offset);
      offset += string.encode.bytes;
      string.encode(data.regexp, buf, offset);
      offset += string.encode.bytes;
      name.encode(data.replacement, buf, offset);
      offset += name.encode.bytes;
      rnaptr.encode.bytes = offset - oldOffset;
      buf.writeUInt16BE(rnaptr.encode.bytes - 2, oldOffset);
      return buf;
    };
    rnaptr.encode.bytes = 0;
    rnaptr.decode = function(buf, offset) {
      if (!offset) offset = 0;
      const oldOffset = offset;
      const data = {};
      offset += 2;
      data.order = buf.readUInt16BE(offset);
      offset += 2;
      data.preference = buf.readUInt16BE(offset);
      offset += 2;
      data.flags = string.decode(buf, offset);
      offset += string.decode.bytes;
      data.services = string.decode(buf, offset);
      offset += string.decode.bytes;
      data.regexp = string.decode(buf, offset);
      offset += string.decode.bytes;
      data.replacement = name.decode(buf, offset);
      offset += name.decode.bytes;
      rnaptr.decode.bytes = offset - oldOffset;
      return data;
    };
    rnaptr.decode.bytes = 0;
    rnaptr.encodingLength = function(data) {
      return string.encodingLength(data.flags) + string.encodingLength(data.services) + string.encodingLength(data.regexp) + name.encodingLength(data.replacement) + 6;
    };
    var rtlsa = exports2.tlsa = {};
    rtlsa.encode = function(cert, buf, offset) {
      if (!buf) buf = Buffer3.alloc(rtlsa.encodingLength(cert));
      if (!offset) offset = 0;
      const oldOffset = offset;
      const certdata = cert.certificate;
      if (!Buffer3.isBuffer(certdata)) {
        throw new Error("Certificate must be a Buffer");
      }
      offset += 2;
      buf.writeUInt8(cert.usage, offset);
      offset += 1;
      buf.writeUInt8(cert.selector, offset);
      offset += 1;
      buf.writeUInt8(cert.matchingType, offset);
      offset += 1;
      certdata.copy(buf, offset, 0, certdata.length);
      offset += certdata.length;
      rtlsa.encode.bytes = offset - oldOffset;
      buf.writeUInt16BE(rtlsa.encode.bytes - 2, oldOffset);
      return buf;
    };
    rtlsa.encode.bytes = 0;
    rtlsa.decode = function(buf, offset) {
      if (!offset) offset = 0;
      const oldOffset = offset;
      const cert = {};
      const length = buf.readUInt16BE(offset);
      offset += 2;
      cert.usage = buf.readUInt8(offset);
      offset += 1;
      cert.selector = buf.readUInt8(offset);
      offset += 1;
      cert.matchingType = buf.readUInt8(offset);
      offset += 1;
      cert.certificate = buf.slice(offset, oldOffset + length + 2);
      offset += cert.certificate.length;
      rtlsa.decode.bytes = offset - oldOffset;
      return cert;
    };
    rtlsa.decode.bytes = 0;
    rtlsa.encodingLength = function(cert) {
      return 5 + Buffer3.byteLength(cert.certificate);
    };
    var renc = exports2.record = function(type) {
      switch (type.toUpperCase()) {
        case "A":
          return ra;
        case "PTR":
          return rptr;
        case "CNAME":
          return rcname;
        case "DNAME":
          return rdname;
        case "TXT":
          return rtxt;
        case "NULL":
          return rnull;
        case "AAAA":
          return raaaa;
        case "SRV":
          return rsrv;
        case "HINFO":
          return rhinfo;
        case "CAA":
          return rcaa;
        case "NS":
          return rns;
        case "SOA":
          return rsoa;
        case "MX":
          return rmx;
        case "OPT":
          return ropt;
        case "DNSKEY":
          return rdnskey;
        case "RRSIG":
          return rrrsig;
        case "RP":
          return rrp;
        case "NSEC":
          return rnsec;
        case "NSEC3":
          return rnsec3;
        case "SSHFP":
          return rsshfp;
        case "DS":
          return rds;
        case "NAPTR":
          return rnaptr;
        case "TLSA":
          return rtlsa;
      }
      return runknown;
    };
    var answer = exports2.answer = {};
    answer.encode = function(a, buf, offset) {
      if (!buf) buf = Buffer3.alloc(answer.encodingLength(a));
      if (!offset) offset = 0;
      const oldOffset = offset;
      name.encode(a.name, buf, offset);
      offset += name.encode.bytes;
      buf.writeUInt16BE(types.toType(a.type), offset);
      if (a.type.toUpperCase() === "OPT") {
        if (a.name !== ".") {
          throw new Error("OPT name must be root.");
        }
        buf.writeUInt16BE(a.udpPayloadSize || 4096, offset + 2);
        buf.writeUInt8(a.extendedRcode || 0, offset + 4);
        buf.writeUInt8(a.ednsVersion || 0, offset + 5);
        buf.writeUInt16BE(a.flags || 0, offset + 6);
        offset += 8;
        ropt.encode(a.options || [], buf, offset);
        offset += ropt.encode.bytes;
      } else {
        let klass = classes.toClass(a.class === void 0 ? "IN" : a.class);
        if (a.flush) klass |= FLUSH_MASK;
        buf.writeUInt16BE(klass, offset + 2);
        buf.writeUInt32BE(a.ttl || 0, offset + 4);
        offset += 8;
        const enc = renc(a.type);
        enc.encode(a.data, buf, offset);
        offset += enc.encode.bytes;
      }
      answer.encode.bytes = offset - oldOffset;
      return buf;
    };
    answer.encode.bytes = 0;
    answer.decode = function(buf, offset) {
      if (!offset) offset = 0;
      const a = {};
      const oldOffset = offset;
      a.name = name.decode(buf, offset);
      offset += name.decode.bytes;
      a.type = types.toString(buf.readUInt16BE(offset));
      if (a.type === "OPT") {
        a.udpPayloadSize = buf.readUInt16BE(offset + 2);
        a.extendedRcode = buf.readUInt8(offset + 4);
        a.ednsVersion = buf.readUInt8(offset + 5);
        a.flags = buf.readUInt16BE(offset + 6);
        a.flag_do = (a.flags >> 15 & 1) === 1;
        a.options = ropt.decode(buf, offset + 8);
        offset += 8 + ropt.decode.bytes;
      } else {
        const klass = buf.readUInt16BE(offset + 2);
        a.ttl = buf.readUInt32BE(offset + 4);
        a.class = classes.toString(klass & NOT_FLUSH_MASK);
        a.flush = !!(klass & FLUSH_MASK);
        const enc = renc(a.type);
        a.data = enc.decode(buf, offset + 8);
        offset += 8 + enc.decode.bytes;
      }
      answer.decode.bytes = offset - oldOffset;
      return a;
    };
    answer.decode.bytes = 0;
    answer.encodingLength = function(a) {
      const data = a.data !== null && a.data !== void 0 ? a.data : a.options;
      return name.encodingLength(a.name) + 8 + renc(a.type).encodingLength(data);
    };
    var question = exports2.question = {};
    question.encode = function(q, buf, offset) {
      if (!buf) buf = Buffer3.alloc(question.encodingLength(q));
      if (!offset) offset = 0;
      const oldOffset = offset;
      name.encode(q.name, buf, offset);
      offset += name.encode.bytes;
      buf.writeUInt16BE(types.toType(q.type), offset);
      offset += 2;
      buf.writeUInt16BE(classes.toClass(q.class === void 0 ? "IN" : q.class), offset);
      offset += 2;
      question.encode.bytes = offset - oldOffset;
      return q;
    };
    question.encode.bytes = 0;
    question.decode = function(buf, offset) {
      if (!offset) offset = 0;
      const oldOffset = offset;
      const q = {};
      q.name = name.decode(buf, offset);
      offset += name.decode.bytes;
      q.type = types.toString(buf.readUInt16BE(offset));
      offset += 2;
      q.class = classes.toString(buf.readUInt16BE(offset));
      offset += 2;
      const qu = !!(q.class & QU_MASK);
      if (qu) q.class &= NOT_QU_MASK;
      question.decode.bytes = offset - oldOffset;
      return q;
    };
    question.decode.bytes = 0;
    question.encodingLength = function(q) {
      return name.encodingLength(q.name) + 4;
    };
    exports2.AUTHORITATIVE_ANSWER = 1 << 10;
    exports2.TRUNCATED_RESPONSE = 1 << 9;
    exports2.RECURSION_DESIRED = 1 << 8;
    exports2.RECURSION_AVAILABLE = 1 << 7;
    exports2.AUTHENTIC_DATA = 1 << 5;
    exports2.CHECKING_DISABLED = 1 << 4;
    exports2.DNSSEC_OK = 1 << 15;
    exports2.encode = function(result, buf, offset) {
      const allocing = !buf;
      if (allocing) buf = Buffer3.alloc(exports2.encodingLength(result));
      if (!offset) offset = 0;
      const oldOffset = offset;
      if (!result.questions) result.questions = [];
      if (!result.answers) result.answers = [];
      if (!result.authorities) result.authorities = [];
      if (!result.additionals) result.additionals = [];
      header.encode(result, buf, offset);
      offset += header.encode.bytes;
      offset = encodeList(result.questions, question, buf, offset);
      offset = encodeList(result.answers, answer, buf, offset);
      offset = encodeList(result.authorities, answer, buf, offset);
      offset = encodeList(result.additionals, answer, buf, offset);
      exports2.encode.bytes = offset - oldOffset;
      if (allocing && exports2.encode.bytes !== buf.length) {
        return buf.slice(0, exports2.encode.bytes);
      }
      return buf;
    };
    exports2.encode.bytes = 0;
    exports2.decode = function(buf, offset) {
      if (!offset) offset = 0;
      const oldOffset = offset;
      const result = header.decode(buf, offset);
      offset += header.decode.bytes;
      offset = decodeList(result.questions, question, buf, offset);
      offset = decodeList(result.answers, answer, buf, offset);
      offset = decodeList(result.authorities, answer, buf, offset);
      offset = decodeList(result.additionals, answer, buf, offset);
      exports2.decode.bytes = offset - oldOffset;
      return result;
    };
    exports2.decode.bytes = 0;
    exports2.encodingLength = function(result) {
      return header.encodingLength(result) + encodingLengthList(result.questions || [], question) + encodingLengthList(result.answers || [], answer) + encodingLengthList(result.authorities || [], answer) + encodingLengthList(result.additionals || [], answer);
    };
    exports2.streamEncode = function(result) {
      const buf = exports2.encode(result);
      const sbuf = Buffer3.alloc(2);
      sbuf.writeUInt16BE(buf.byteLength);
      const combine = Buffer3.concat([sbuf, buf]);
      exports2.streamEncode.bytes = combine.byteLength;
      return combine;
    };
    exports2.streamEncode.bytes = 0;
    exports2.streamDecode = function(sbuf) {
      const len = sbuf.readUInt16BE(0);
      if (sbuf.byteLength < len + 2) {
        return null;
      }
      const result = exports2.decode(sbuf.slice(2));
      exports2.streamDecode.bytes = exports2.decode.bytes;
      return result;
    };
    exports2.streamDecode.bytes = 0;
    function encodingLengthList(list, enc) {
      let len = 0;
      for (let i = 0; i < list.length; i++) len += enc.encodingLength(list[i]);
      return len;
    }
    function encodeList(list, enc, buf, offset) {
      for (let i = 0; i < list.length; i++) {
        enc.encode(list[i], buf, offset);
        offset += enc.encode.bytes;
      }
      return offset;
    }
    function decodeList(list, enc, buf, offset) {
      for (let i = 0; i < list.length; i++) {
        list[i] = enc.decode(buf, offset);
        offset += enc.decode.bytes;
      }
      return offset;
    }
  }
});

// node_modules/thunky/index.js
var require_thunky = __commonJS({
  "node_modules/thunky/index.js"(exports2, module2) {
    "use strict";
    var nextTick = nextTickArgs;
    process.nextTick(upgrade, 42);
    module2.exports = thunky;
    function thunky(fn) {
      var state = run;
      return thunk;
      function thunk(callback) {
        state(callback || noop);
      }
      function run(callback) {
        var stack = [callback];
        state = wait;
        fn(done);
        function wait(callback2) {
          stack.push(callback2);
        }
        function done(err) {
          var args = arguments;
          state = isError(err) ? run : finished;
          while (stack.length) finished(stack.shift());
          function finished(callback2) {
            nextTick(apply, callback2, args);
          }
        }
      }
    }
    function isError(err) {
      return Object.prototype.toString.call(err) === "[object Error]";
    }
    function noop() {
    }
    function apply(callback, args) {
      callback.apply(null, args);
    }
    function upgrade(val) {
      if (val === 42) nextTick = process.nextTick;
    }
    function nextTickArgs(fn, a, b) {
      process.nextTick(function() {
        fn(a, b);
      });
    }
  }
});

// node_modules/multicast-dns/index.js
var require_multicast_dns = __commonJS({
  "node_modules/multicast-dns/index.js"(exports2, module2) {
    var packet = require_dns_packet();
    var dgram = require("dgram");
    var thunky = require_thunky();
    var events = require("events");
    var os2 = require("os");
    var noop = function() {
    };
    module2.exports = function(opts) {
      if (!opts) opts = {};
      var that = new events.EventEmitter();
      var port = typeof opts.port === "number" ? opts.port : 5353;
      var type = opts.type || "udp4";
      var ip = opts.ip || opts.host || (type === "udp4" ? "224.0.0.251" : null);
      var me = { address: ip, port };
      var memberships = {};
      var destroyed = false;
      var interval = null;
      if (type === "udp6" && (!ip || !opts.interface)) {
        throw new Error("For IPv6 multicast you must specify `ip` and `interface`");
      }
      var socket = opts.socket || dgram.createSocket({
        type,
        reuseAddr: opts.reuseAddr !== false,
        toString: function() {
          return type;
        }
      });
      socket.on("error", function(err) {
        if (err.code === "EACCES" || err.code === "EADDRINUSE") that.emit("error", err);
        else that.emit("warning", err);
      });
      socket.on("message", function(message, rinfo) {
        try {
          message = packet.decode(message);
        } catch (err) {
          that.emit("warning", err);
          return;
        }
        that.emit("packet", message, rinfo);
        if (message.type === "query") that.emit("query", message, rinfo);
        if (message.type === "response") that.emit("response", message, rinfo);
      });
      socket.on("listening", function() {
        if (!port) port = me.port = socket.address().port;
        if (opts.multicast !== false) {
          that.update();
          interval = setInterval(that.update, 5e3);
          socket.setMulticastTTL(opts.ttl || 255);
          socket.setMulticastLoopback(opts.loopback !== false);
        }
      });
      var bind = thunky(function(cb) {
        if (!port || opts.bind === false) return cb(null);
        socket.once("error", cb);
        socket.bind(port, opts.bind || opts.interface, function() {
          socket.removeListener("error", cb);
          cb(null);
        });
      });
      bind(function(err) {
        if (err) return that.emit("error", err);
        that.emit("ready");
      });
      that.send = function(value, rinfo, cb) {
        if (typeof rinfo === "function") return that.send(value, null, rinfo);
        if (!cb) cb = noop;
        if (!rinfo) rinfo = me;
        else if (!rinfo.host && !rinfo.address) rinfo.address = me.address;
        bind(onbind);
        function onbind(err) {
          if (destroyed) return cb();
          if (err) return cb(err);
          var message = packet.encode(value);
          socket.send(message, 0, message.length, rinfo.port, rinfo.address || rinfo.host, cb);
        }
      };
      that.response = that.respond = function(res, rinfo, cb) {
        if (Array.isArray(res)) res = { answers: res };
        res.type = "response";
        res.flags = (res.flags || 0) | packet.AUTHORITATIVE_ANSWER;
        that.send(res, rinfo, cb);
      };
      that.query = function(q, type2, rinfo, cb) {
        if (typeof type2 === "function") return that.query(q, null, null, type2);
        if (typeof type2 === "object" && type2 && type2.port) return that.query(q, null, type2, rinfo);
        if (typeof rinfo === "function") return that.query(q, type2, null, rinfo);
        if (!cb) cb = noop;
        if (typeof q === "string") q = [{ name: q, type: type2 || "ANY" }];
        if (Array.isArray(q)) q = { type: "query", questions: q };
        q.type = "query";
        that.send(q, rinfo, cb);
      };
      that.destroy = function(cb) {
        if (!cb) cb = noop;
        if (destroyed) return process.nextTick(cb);
        destroyed = true;
        clearInterval(interval);
        for (var iface in memberships) {
          try {
            socket.dropMembership(ip, iface);
          } catch (e) {
          }
        }
        memberships = {};
        socket.close(cb);
      };
      that.update = function() {
        var ifaces = opts.interface ? [].concat(opts.interface) : allInterfaces();
        var updated = false;
        for (var i = 0; i < ifaces.length; i++) {
          var addr = ifaces[i];
          if (memberships[addr]) continue;
          try {
            socket.addMembership(ip, addr);
            memberships[addr] = true;
            updated = true;
          } catch (err) {
            that.emit("warning", err);
          }
        }
        if (updated) {
          if (socket.setMulticastInterface) {
            try {
              socket.setMulticastInterface(opts.interface || defaultInterface());
            } catch (err) {
              that.emit("warning", err);
            }
          }
          that.emit("networkInterface");
        }
      };
      return that;
    };
    function defaultInterface() {
      var networks = os2.networkInterfaces();
      var names = Object.keys(networks);
      for (var i = 0; i < names.length; i++) {
        var net = networks[names[i]];
        for (var j = 0; j < net.length; j++) {
          var iface = net[j];
          if (isIPv4(iface.family) && !iface.internal) {
            if (os2.platform() === "darwin" && names[i] === "en0") return iface.address;
            return "0.0.0.0";
          }
        }
      }
      return "127.0.0.1";
    }
    function allInterfaces() {
      var networks = os2.networkInterfaces();
      var names = Object.keys(networks);
      var res = [];
      for (var i = 0; i < names.length; i++) {
        var net = networks[names[i]];
        for (var j = 0; j < net.length; j++) {
          var iface = net[j];
          if (isIPv4(iface.family)) {
            res.push(iface.address);
            break;
          }
        }
      }
      return res;
    }
    function isIPv4(family) {
      return family === 4 || family === "IPv4";
    }
  }
});

// node_modules/object-keys/isArguments.js
var require_isArguments = __commonJS({
  "node_modules/object-keys/isArguments.js"(exports2, module2) {
    "use strict";
    var toStr = Object.prototype.toString;
    module2.exports = function isArguments(value) {
      var str = toStr.call(value);
      var isArgs = str === "[object Arguments]";
      if (!isArgs) {
        isArgs = str !== "[object Array]" && value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && toStr.call(value.callee) === "[object Function]";
      }
      return isArgs;
    };
  }
});

// node_modules/object-keys/implementation.js
var require_implementation = __commonJS({
  "node_modules/object-keys/implementation.js"(exports2, module2) {
    "use strict";
    var keysShim;
    if (!Object.keys) {
      has = Object.prototype.hasOwnProperty;
      toStr = Object.prototype.toString;
      isArgs = require_isArguments();
      isEnumerable = Object.prototype.propertyIsEnumerable;
      hasDontEnumBug = !isEnumerable.call({ toString: null }, "toString");
      hasProtoEnumBug = isEnumerable.call(function() {
      }, "prototype");
      dontEnums = [
        "toString",
        "toLocaleString",
        "valueOf",
        "hasOwnProperty",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "constructor"
      ];
      equalsConstructorPrototype = function(o) {
        var ctor = o.constructor;
        return ctor && ctor.prototype === o;
      };
      excludedKeys = {
        $applicationCache: true,
        $console: true,
        $external: true,
        $frame: true,
        $frameElement: true,
        $frames: true,
        $innerHeight: true,
        $innerWidth: true,
        $onmozfullscreenchange: true,
        $onmozfullscreenerror: true,
        $outerHeight: true,
        $outerWidth: true,
        $pageXOffset: true,
        $pageYOffset: true,
        $parent: true,
        $scrollLeft: true,
        $scrollTop: true,
        $scrollX: true,
        $scrollY: true,
        $self: true,
        $webkitIndexedDB: true,
        $webkitStorageInfo: true,
        $window: true
      };
      hasAutomationEqualityBug = (function() {
        if (typeof window === "undefined") {
          return false;
        }
        for (var k in window) {
          try {
            if (!excludedKeys["$" + k] && has.call(window, k) && window[k] !== null && typeof window[k] === "object") {
              try {
                equalsConstructorPrototype(window[k]);
              } catch (e) {
                return true;
              }
            }
          } catch (e) {
            return true;
          }
        }
        return false;
      })();
      equalsConstructorPrototypeIfNotBuggy = function(o) {
        if (typeof window === "undefined" || !hasAutomationEqualityBug) {
          return equalsConstructorPrototype(o);
        }
        try {
          return equalsConstructorPrototype(o);
        } catch (e) {
          return false;
        }
      };
      keysShim = function keys(object) {
        var isObject = object !== null && typeof object === "object";
        var isFunction = toStr.call(object) === "[object Function]";
        var isArguments = isArgs(object);
        var isString = isObject && toStr.call(object) === "[object String]";
        var theKeys = [];
        if (!isObject && !isFunction && !isArguments) {
          throw new TypeError("Object.keys called on a non-object");
        }
        var skipProto = hasProtoEnumBug && isFunction;
        if (isString && object.length > 0 && !has.call(object, 0)) {
          for (var i = 0; i < object.length; ++i) {
            theKeys.push(String(i));
          }
        }
        if (isArguments && object.length > 0) {
          for (var j = 0; j < object.length; ++j) {
            theKeys.push(String(j));
          }
        } else {
          for (var name in object) {
            if (!(skipProto && name === "prototype") && has.call(object, name)) {
              theKeys.push(String(name));
            }
          }
        }
        if (hasDontEnumBug) {
          var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
          for (var k = 0; k < dontEnums.length; ++k) {
            if (!(skipConstructor && dontEnums[k] === "constructor") && has.call(object, dontEnums[k])) {
              theKeys.push(dontEnums[k]);
            }
          }
        }
        return theKeys;
      };
    }
    var has;
    var toStr;
    var isArgs;
    var isEnumerable;
    var hasDontEnumBug;
    var hasProtoEnumBug;
    var dontEnums;
    var equalsConstructorPrototype;
    var excludedKeys;
    var hasAutomationEqualityBug;
    var equalsConstructorPrototypeIfNotBuggy;
    module2.exports = keysShim;
  }
});

// node_modules/object-keys/index.js
var require_object_keys = __commonJS({
  "node_modules/object-keys/index.js"(exports2, module2) {
    "use strict";
    var slice = Array.prototype.slice;
    var isArgs = require_isArguments();
    var origKeys = Object.keys;
    var keysShim = origKeys ? function keys(o) {
      return origKeys(o);
    } : require_implementation();
    var originalKeys = Object.keys;
    keysShim.shim = function shimObjectKeys() {
      if (Object.keys) {
        var keysWorksWithArguments = (function() {
          var args = Object.keys(arguments);
          return args && args.length === arguments.length;
        })(1, 2);
        if (!keysWorksWithArguments) {
          Object.keys = function keys(object) {
            if (isArgs(object)) {
              return originalKeys(slice.call(object));
            }
            return originalKeys(object);
          };
        }
      } else {
        Object.keys = keysShim;
      }
      return Object.keys || keysShim;
    };
    module2.exports = keysShim;
  }
});

// node_modules/has-symbols/shams.js
var require_shams = __commonJS({
  "node_modules/has-symbols/shams.js"(exports2, module2) {
    "use strict";
    module2.exports = function hasSymbols() {
      if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
        return false;
      }
      if (typeof Symbol.iterator === "symbol") {
        return true;
      }
      var obj = {};
      var sym = Symbol("test");
      var symObj = Object(sym);
      if (typeof sym === "string") {
        return false;
      }
      if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
        return false;
      }
      if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
        return false;
      }
      var symVal = 42;
      obj[sym] = symVal;
      for (var _ in obj) {
        return false;
      }
      if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
        return false;
      }
      if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
        return false;
      }
      var syms = Object.getOwnPropertySymbols(obj);
      if (syms.length !== 1 || syms[0] !== sym) {
        return false;
      }
      if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
        return false;
      }
      if (typeof Object.getOwnPropertyDescriptor === "function") {
        var descriptor = (
          /** @type {PropertyDescriptor} */
          Object.getOwnPropertyDescriptor(obj, sym)
        );
        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
          return false;
        }
      }
      return true;
    };
  }
});

// node_modules/has-tostringtag/shams.js
var require_shams2 = __commonJS({
  "node_modules/has-tostringtag/shams.js"(exports2, module2) {
    "use strict";
    var hasSymbols = require_shams();
    module2.exports = function hasToStringTagShams() {
      return hasSymbols() && !!Symbol.toStringTag;
    };
  }
});

// node_modules/es-object-atoms/index.js
var require_es_object_atoms = __commonJS({
  "node_modules/es-object-atoms/index.js"(exports2, module2) {
    "use strict";
    module2.exports = Object;
  }
});

// node_modules/es-errors/index.js
var require_es_errors = __commonJS({
  "node_modules/es-errors/index.js"(exports2, module2) {
    "use strict";
    module2.exports = Error;
  }
});

// node_modules/es-errors/eval.js
var require_eval = __commonJS({
  "node_modules/es-errors/eval.js"(exports2, module2) {
    "use strict";
    module2.exports = EvalError;
  }
});

// node_modules/es-errors/range.js
var require_range = __commonJS({
  "node_modules/es-errors/range.js"(exports2, module2) {
    "use strict";
    module2.exports = RangeError;
  }
});

// node_modules/es-errors/ref.js
var require_ref = __commonJS({
  "node_modules/es-errors/ref.js"(exports2, module2) {
    "use strict";
    module2.exports = ReferenceError;
  }
});

// node_modules/es-errors/syntax.js
var require_syntax = __commonJS({
  "node_modules/es-errors/syntax.js"(exports2, module2) {
    "use strict";
    module2.exports = SyntaxError;
  }
});

// node_modules/es-errors/type.js
var require_type = __commonJS({
  "node_modules/es-errors/type.js"(exports2, module2) {
    "use strict";
    module2.exports = TypeError;
  }
});

// node_modules/es-errors/uri.js
var require_uri = __commonJS({
  "node_modules/es-errors/uri.js"(exports2, module2) {
    "use strict";
    module2.exports = URIError;
  }
});

// node_modules/math-intrinsics/abs.js
var require_abs = __commonJS({
  "node_modules/math-intrinsics/abs.js"(exports2, module2) {
    "use strict";
    module2.exports = Math.abs;
  }
});

// node_modules/math-intrinsics/floor.js
var require_floor = __commonJS({
  "node_modules/math-intrinsics/floor.js"(exports2, module2) {
    "use strict";
    module2.exports = Math.floor;
  }
});

// node_modules/math-intrinsics/max.js
var require_max = __commonJS({
  "node_modules/math-intrinsics/max.js"(exports2, module2) {
    "use strict";
    module2.exports = Math.max;
  }
});

// node_modules/math-intrinsics/min.js
var require_min = __commonJS({
  "node_modules/math-intrinsics/min.js"(exports2, module2) {
    "use strict";
    module2.exports = Math.min;
  }
});

// node_modules/math-intrinsics/pow.js
var require_pow = __commonJS({
  "node_modules/math-intrinsics/pow.js"(exports2, module2) {
    "use strict";
    module2.exports = Math.pow;
  }
});

// node_modules/math-intrinsics/round.js
var require_round = __commonJS({
  "node_modules/math-intrinsics/round.js"(exports2, module2) {
    "use strict";
    module2.exports = Math.round;
  }
});

// node_modules/math-intrinsics/isNaN.js
var require_isNaN = __commonJS({
  "node_modules/math-intrinsics/isNaN.js"(exports2, module2) {
    "use strict";
    module2.exports = Number.isNaN || function isNaN2(a) {
      return a !== a;
    };
  }
});

// node_modules/math-intrinsics/sign.js
var require_sign = __commonJS({
  "node_modules/math-intrinsics/sign.js"(exports2, module2) {
    "use strict";
    var $isNaN = require_isNaN();
    module2.exports = function sign(number) {
      if ($isNaN(number) || number === 0) {
        return number;
      }
      return number < 0 ? -1 : 1;
    };
  }
});

// node_modules/gopd/gOPD.js
var require_gOPD = __commonJS({
  "node_modules/gopd/gOPD.js"(exports2, module2) {
    "use strict";
    module2.exports = Object.getOwnPropertyDescriptor;
  }
});

// node_modules/gopd/index.js
var require_gopd = __commonJS({
  "node_modules/gopd/index.js"(exports2, module2) {
    "use strict";
    var $gOPD = require_gOPD();
    if ($gOPD) {
      try {
        $gOPD([], "length");
      } catch (e) {
        $gOPD = null;
      }
    }
    module2.exports = $gOPD;
  }
});

// node_modules/es-define-property/index.js
var require_es_define_property = __commonJS({
  "node_modules/es-define-property/index.js"(exports2, module2) {
    "use strict";
    var $defineProperty = Object.defineProperty || false;
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", { value: 1 });
      } catch (e) {
        $defineProperty = false;
      }
    }
    module2.exports = $defineProperty;
  }
});

// node_modules/has-symbols/index.js
var require_has_symbols = __commonJS({
  "node_modules/has-symbols/index.js"(exports2, module2) {
    "use strict";
    var origSymbol = typeof Symbol !== "undefined" && Symbol;
    var hasSymbolSham = require_shams();
    module2.exports = function hasNativeSymbols() {
      if (typeof origSymbol !== "function") {
        return false;
      }
      if (typeof Symbol !== "function") {
        return false;
      }
      if (typeof origSymbol("foo") !== "symbol") {
        return false;
      }
      if (typeof Symbol("bar") !== "symbol") {
        return false;
      }
      return hasSymbolSham();
    };
  }
});

// node_modules/get-proto/Reflect.getPrototypeOf.js
var require_Reflect_getPrototypeOf = __commonJS({
  "node_modules/get-proto/Reflect.getPrototypeOf.js"(exports2, module2) {
    "use strict";
    module2.exports = typeof Reflect !== "undefined" && Reflect.getPrototypeOf || null;
  }
});

// node_modules/get-proto/Object.getPrototypeOf.js
var require_Object_getPrototypeOf = __commonJS({
  "node_modules/get-proto/Object.getPrototypeOf.js"(exports2, module2) {
    "use strict";
    var $Object = require_es_object_atoms();
    module2.exports = $Object.getPrototypeOf || null;
  }
});

// node_modules/function-bind/implementation.js
var require_implementation2 = __commonJS({
  "node_modules/function-bind/implementation.js"(exports2, module2) {
    "use strict";
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var toStr = Object.prototype.toString;
    var max = Math.max;
    var funcType = "[object Function]";
    var concatty = function concatty2(a, b) {
      var arr = [];
      for (var i = 0; i < a.length; i += 1) {
        arr[i] = a[i];
      }
      for (var j = 0; j < b.length; j += 1) {
        arr[j + a.length] = b[j];
      }
      return arr;
    };
    var slicy = function slicy2(arrLike, offset) {
      var arr = [];
      for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
        arr[j] = arrLike[i];
      }
      return arr;
    };
    var joiny = function(arr, joiner) {
      var str = "";
      for (var i = 0; i < arr.length; i += 1) {
        str += arr[i];
        if (i + 1 < arr.length) {
          str += joiner;
        }
      }
      return str;
    };
    module2.exports = function bind(that) {
      var target = this;
      if (typeof target !== "function" || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slicy(arguments, 1);
      var bound;
      var binder = function() {
        if (this instanceof bound) {
          var result = target.apply(
            this,
            concatty(args, arguments)
          );
          if (Object(result) === result) {
            return result;
          }
          return this;
        }
        return target.apply(
          that,
          concatty(args, arguments)
        );
      };
      var boundLength = max(0, target.length - args.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs[i] = "$" + i;
      }
      bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
      if (target.prototype) {
        var Empty = function Empty2() {
        };
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    };
  }
});

// node_modules/function-bind/index.js
var require_function_bind = __commonJS({
  "node_modules/function-bind/index.js"(exports2, module2) {
    "use strict";
    var implementation = require_implementation2();
    module2.exports = Function.prototype.bind || implementation;
  }
});

// node_modules/call-bind-apply-helpers/functionCall.js
var require_functionCall = __commonJS({
  "node_modules/call-bind-apply-helpers/functionCall.js"(exports2, module2) {
    "use strict";
    module2.exports = Function.prototype.call;
  }
});

// node_modules/call-bind-apply-helpers/functionApply.js
var require_functionApply = __commonJS({
  "node_modules/call-bind-apply-helpers/functionApply.js"(exports2, module2) {
    "use strict";
    module2.exports = Function.prototype.apply;
  }
});

// node_modules/call-bind-apply-helpers/reflectApply.js
var require_reflectApply = __commonJS({
  "node_modules/call-bind-apply-helpers/reflectApply.js"(exports2, module2) {
    "use strict";
    module2.exports = typeof Reflect !== "undefined" && Reflect && Reflect.apply;
  }
});

// node_modules/call-bind-apply-helpers/actualApply.js
var require_actualApply = __commonJS({
  "node_modules/call-bind-apply-helpers/actualApply.js"(exports2, module2) {
    "use strict";
    var bind = require_function_bind();
    var $apply = require_functionApply();
    var $call = require_functionCall();
    var $reflectApply = require_reflectApply();
    module2.exports = $reflectApply || bind.call($call, $apply);
  }
});

// node_modules/call-bind-apply-helpers/index.js
var require_call_bind_apply_helpers = __commonJS({
  "node_modules/call-bind-apply-helpers/index.js"(exports2, module2) {
    "use strict";
    var bind = require_function_bind();
    var $TypeError = require_type();
    var $call = require_functionCall();
    var $actualApply = require_actualApply();
    module2.exports = function callBindBasic(args) {
      if (args.length < 1 || typeof args[0] !== "function") {
        throw new $TypeError("a function is required");
      }
      return $actualApply(bind, $call, args);
    };
  }
});

// node_modules/dunder-proto/get.js
var require_get = __commonJS({
  "node_modules/dunder-proto/get.js"(exports2, module2) {
    "use strict";
    var callBind = require_call_bind_apply_helpers();
    var gOPD = require_gopd();
    var hasProtoAccessor;
    try {
      hasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */
      [].__proto__ === Array.prototype;
    } catch (e) {
      if (!e || typeof e !== "object" || !("code" in e) || e.code !== "ERR_PROTO_ACCESS") {
        throw e;
      }
    }
    var desc = !!hasProtoAccessor && gOPD && gOPD(
      Object.prototype,
      /** @type {keyof typeof Object.prototype} */
      "__proto__"
    );
    var $Object = Object;
    var $getPrototypeOf = $Object.getPrototypeOf;
    module2.exports = desc && typeof desc.get === "function" ? callBind([desc.get]) : typeof $getPrototypeOf === "function" ? (
      /** @type {import('./get')} */
      function getDunder(value) {
        return $getPrototypeOf(value == null ? value : $Object(value));
      }
    ) : false;
  }
});

// node_modules/get-proto/index.js
var require_get_proto = __commonJS({
  "node_modules/get-proto/index.js"(exports2, module2) {
    "use strict";
    var reflectGetProto = require_Reflect_getPrototypeOf();
    var originalGetProto = require_Object_getPrototypeOf();
    var getDunderProto = require_get();
    module2.exports = reflectGetProto ? function getProto(O) {
      return reflectGetProto(O);
    } : originalGetProto ? function getProto(O) {
      if (!O || typeof O !== "object" && typeof O !== "function") {
        throw new TypeError("getProto: not an object");
      }
      return originalGetProto(O);
    } : getDunderProto ? function getProto(O) {
      return getDunderProto(O);
    } : null;
  }
});

// node_modules/hasown/index.js
var require_hasown = __commonJS({
  "node_modules/hasown/index.js"(exports2, module2) {
    "use strict";
    var call = Function.prototype.call;
    var $hasOwn = Object.prototype.hasOwnProperty;
    var bind = require_function_bind();
    module2.exports = bind.call(call, $hasOwn);
  }
});

// node_modules/get-intrinsic/index.js
var require_get_intrinsic = __commonJS({
  "node_modules/get-intrinsic/index.js"(exports2, module2) {
    "use strict";
    var undefined2;
    var $Object = require_es_object_atoms();
    var $Error = require_es_errors();
    var $EvalError = require_eval();
    var $RangeError = require_range();
    var $ReferenceError = require_ref();
    var $SyntaxError = require_syntax();
    var $TypeError = require_type();
    var $URIError = require_uri();
    var abs = require_abs();
    var floor = require_floor();
    var max = require_max();
    var min = require_min();
    var pow = require_pow();
    var round = require_round();
    var sign = require_sign();
    var $Function = Function;
    var getEvalledConstructor = function(expressionSyntax) {
      try {
        return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
      } catch (e) {
      }
    };
    var $gOPD = require_gopd();
    var $defineProperty = require_es_define_property();
    var throwTypeError = function() {
      throw new $TypeError();
    };
    var ThrowTypeError = $gOPD ? (function() {
      try {
        arguments.callee;
        return throwTypeError;
      } catch (calleeThrows) {
        try {
          return $gOPD(arguments, "callee").get;
        } catch (gOPDthrows) {
          return throwTypeError;
        }
      }
    })() : throwTypeError;
    var hasSymbols = require_has_symbols()();
    var getProto = require_get_proto();
    var $ObjectGPO = require_Object_getPrototypeOf();
    var $ReflectGPO = require_Reflect_getPrototypeOf();
    var $apply = require_functionApply();
    var $call = require_functionCall();
    var needsEval = {};
    var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined2 : getProto(Uint8Array);
    var INTRINSICS = {
      __proto__: null,
      "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
      "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined2,
      "%AsyncFromSyncIteratorPrototype%": undefined2,
      "%AsyncFunction%": needsEval,
      "%AsyncGenerator%": needsEval,
      "%AsyncGeneratorFunction%": needsEval,
      "%AsyncIteratorPrototype%": needsEval,
      "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
      "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
      "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined2 : BigInt64Array,
      "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined2 : BigUint64Array,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": $Error,
      "%eval%": eval,
      // eslint-disable-line no-eval
      "%EvalError%": $EvalError,
      "%Float16Array%": typeof Float16Array === "undefined" ? undefined2 : Float16Array,
      "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
      "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
      "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
      "%Function%": $Function,
      "%GeneratorFunction%": needsEval,
      "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
      "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
      "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined2,
      "%JSON%": typeof JSON === "object" ? JSON : undefined2,
      "%Map%": typeof Map === "undefined" ? undefined2 : Map,
      "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": $Object,
      "%Object.getOwnPropertyDescriptor%": $gOPD,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
      "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
      "%RangeError%": $RangeError,
      "%ReferenceError%": $ReferenceError,
      "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set === "undefined" ? undefined2 : Set,
      "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
      "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined2,
      "%Symbol%": hasSymbols ? Symbol : undefined2,
      "%SyntaxError%": $SyntaxError,
      "%ThrowTypeError%": ThrowTypeError,
      "%TypedArray%": TypedArray,
      "%TypeError%": $TypeError,
      "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
      "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
      "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
      "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
      "%URIError%": $URIError,
      "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
      "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
      "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet,
      "%Function.prototype.call%": $call,
      "%Function.prototype.apply%": $apply,
      "%Object.defineProperty%": $defineProperty,
      "%Object.getPrototypeOf%": $ObjectGPO,
      "%Math.abs%": abs,
      "%Math.floor%": floor,
      "%Math.max%": max,
      "%Math.min%": min,
      "%Math.pow%": pow,
      "%Math.round%": round,
      "%Math.sign%": sign,
      "%Reflect.getPrototypeOf%": $ReflectGPO
    };
    if (getProto) {
      try {
        null.error;
      } catch (e) {
        errorProto = getProto(getProto(e));
        INTRINSICS["%Error.prototype%"] = errorProto;
      }
    }
    var errorProto;
    var doEval = function doEval2(name) {
      var value;
      if (name === "%AsyncFunction%") {
        value = getEvalledConstructor("async function () {}");
      } else if (name === "%GeneratorFunction%") {
        value = getEvalledConstructor("function* () {}");
      } else if (name === "%AsyncGeneratorFunction%") {
        value = getEvalledConstructor("async function* () {}");
      } else if (name === "%AsyncGenerator%") {
        var fn = doEval2("%AsyncGeneratorFunction%");
        if (fn) {
          value = fn.prototype;
        }
      } else if (name === "%AsyncIteratorPrototype%") {
        var gen = doEval2("%AsyncGenerator%");
        if (gen && getProto) {
          value = getProto(gen.prototype);
        }
      }
      INTRINSICS[name] = value;
      return value;
    };
    var LEGACY_ALIASES = {
      __proto__: null,
      "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
      "%ArrayPrototype%": ["Array", "prototype"],
      "%ArrayProto_entries%": ["Array", "prototype", "entries"],
      "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
      "%ArrayProto_keys%": ["Array", "prototype", "keys"],
      "%ArrayProto_values%": ["Array", "prototype", "values"],
      "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
      "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
      "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
      "%BooleanPrototype%": ["Boolean", "prototype"],
      "%DataViewPrototype%": ["DataView", "prototype"],
      "%DatePrototype%": ["Date", "prototype"],
      "%ErrorPrototype%": ["Error", "prototype"],
      "%EvalErrorPrototype%": ["EvalError", "prototype"],
      "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
      "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
      "%FunctionPrototype%": ["Function", "prototype"],
      "%Generator%": ["GeneratorFunction", "prototype"],
      "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
      "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
      "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
      "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
      "%JSONParse%": ["JSON", "parse"],
      "%JSONStringify%": ["JSON", "stringify"],
      "%MapPrototype%": ["Map", "prototype"],
      "%NumberPrototype%": ["Number", "prototype"],
      "%ObjectPrototype%": ["Object", "prototype"],
      "%ObjProto_toString%": ["Object", "prototype", "toString"],
      "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
      "%PromisePrototype%": ["Promise", "prototype"],
      "%PromiseProto_then%": ["Promise", "prototype", "then"],
      "%Promise_all%": ["Promise", "all"],
      "%Promise_reject%": ["Promise", "reject"],
      "%Promise_resolve%": ["Promise", "resolve"],
      "%RangeErrorPrototype%": ["RangeError", "prototype"],
      "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
      "%RegExpPrototype%": ["RegExp", "prototype"],
      "%SetPrototype%": ["Set", "prototype"],
      "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
      "%StringPrototype%": ["String", "prototype"],
      "%SymbolPrototype%": ["Symbol", "prototype"],
      "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
      "%TypedArrayPrototype%": ["TypedArray", "prototype"],
      "%TypeErrorPrototype%": ["TypeError", "prototype"],
      "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
      "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
      "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
      "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
      "%URIErrorPrototype%": ["URIError", "prototype"],
      "%WeakMapPrototype%": ["WeakMap", "prototype"],
      "%WeakSetPrototype%": ["WeakSet", "prototype"]
    };
    var bind = require_function_bind();
    var hasOwn = require_hasown();
    var $concat = bind.call($call, Array.prototype.concat);
    var $spliceApply = bind.call($apply, Array.prototype.splice);
    var $replace = bind.call($call, String.prototype.replace);
    var $strSlice = bind.call($call, String.prototype.slice);
    var $exec = bind.call($call, RegExp.prototype.exec);
    var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = function stringToPath2(string) {
      var first = $strSlice(string, 0, 1);
      var last = $strSlice(string, -1);
      if (first === "%" && last !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
      } else if (last === "%" && first !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
      }
      var result = [];
      $replace(string, rePropName, function(match, number, quote, subString) {
        result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
      });
      return result;
    };
    var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
      var intrinsicName = name;
      var alias;
      if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
        alias = LEGACY_ALIASES[intrinsicName];
        intrinsicName = "%" + alias[0] + "%";
      }
      if (hasOwn(INTRINSICS, intrinsicName)) {
        var value = INTRINSICS[intrinsicName];
        if (value === needsEval) {
          value = doEval(intrinsicName);
        }
        if (typeof value === "undefined" && !allowMissing) {
          throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
        }
        return {
          alias,
          name: intrinsicName,
          value
        };
      }
      throw new $SyntaxError("intrinsic " + name + " does not exist!");
    };
    module2.exports = function GetIntrinsic(name, allowMissing) {
      if (typeof name !== "string" || name.length === 0) {
        throw new $TypeError("intrinsic name must be a non-empty string");
      }
      if (arguments.length > 1 && typeof allowMissing !== "boolean") {
        throw new $TypeError('"allowMissing" argument must be a boolean');
      }
      if ($exec(/^%?[^%]*%?$/, name) === null) {
        throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
      }
      var parts = stringToPath(name);
      var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
      var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
      var intrinsicRealName = intrinsic.name;
      var value = intrinsic.value;
      var skipFurtherCaching = false;
      var alias = intrinsic.alias;
      if (alias) {
        intrinsicBaseName = alias[0];
        $spliceApply(parts, $concat([0, 1], alias));
      }
      for (var i = 1, isOwn = true; i < parts.length; i += 1) {
        var part = parts[i];
        var first = $strSlice(part, 0, 1);
        var last = $strSlice(part, -1);
        if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
          throw new $SyntaxError("property names with quotes must have matching quotes");
        }
        if (part === "constructor" || !isOwn) {
          skipFurtherCaching = true;
        }
        intrinsicBaseName += "." + part;
        intrinsicRealName = "%" + intrinsicBaseName + "%";
        if (hasOwn(INTRINSICS, intrinsicRealName)) {
          value = INTRINSICS[intrinsicRealName];
        } else if (value != null) {
          if (!(part in value)) {
            if (!allowMissing) {
              throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
            }
            return void undefined2;
          }
          if ($gOPD && i + 1 >= parts.length) {
            var desc = $gOPD(value, part);
            isOwn = !!desc;
            if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
              value = desc.get;
            } else {
              value = value[part];
            }
          } else {
            isOwn = hasOwn(value, part);
            value = value[part];
          }
          if (isOwn && !skipFurtherCaching) {
            INTRINSICS[intrinsicRealName] = value;
          }
        }
      }
      return value;
    };
  }
});

// node_modules/call-bound/index.js
var require_call_bound = __commonJS({
  "node_modules/call-bound/index.js"(exports2, module2) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var callBindBasic = require_call_bind_apply_helpers();
    var $indexOf = callBindBasic([GetIntrinsic("%String.prototype.indexOf%")]);
    module2.exports = function callBoundIntrinsic(name, allowMissing) {
      var intrinsic = (
        /** @type {(this: unknown, ...args: unknown[]) => unknown} */
        GetIntrinsic(name, !!allowMissing)
      );
      if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
        return callBindBasic(
          /** @type {const} */
          [intrinsic]
        );
      }
      return intrinsic;
    };
  }
});

// node_modules/is-arguments/index.js
var require_is_arguments = __commonJS({
  "node_modules/is-arguments/index.js"(exports2, module2) {
    "use strict";
    var hasToStringTag = require_shams2()();
    var callBound = require_call_bound();
    var $toString = callBound("Object.prototype.toString");
    var isStandardArguments = function isArguments(value) {
      if (hasToStringTag && value && typeof value === "object" && Symbol.toStringTag in value) {
        return false;
      }
      return $toString(value) === "[object Arguments]";
    };
    var isLegacyArguments = function isArguments(value) {
      if (isStandardArguments(value)) {
        return true;
      }
      return value !== null && typeof value === "object" && "length" in value && typeof value.length === "number" && value.length >= 0 && $toString(value) !== "[object Array]" && "callee" in value && $toString(value.callee) === "[object Function]";
    };
    var supportsStandardArguments = (function() {
      return isStandardArguments(arguments);
    })();
    isStandardArguments.isLegacyArguments = isLegacyArguments;
    module2.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;
  }
});

// node_modules/define-data-property/index.js
var require_define_data_property = __commonJS({
  "node_modules/define-data-property/index.js"(exports2, module2) {
    "use strict";
    var $defineProperty = require_es_define_property();
    var $SyntaxError = require_syntax();
    var $TypeError = require_type();
    var gopd = require_gopd();
    module2.exports = function defineDataProperty(obj, property, value) {
      if (!obj || typeof obj !== "object" && typeof obj !== "function") {
        throw new $TypeError("`obj` must be an object or a function`");
      }
      if (typeof property !== "string" && typeof property !== "symbol") {
        throw new $TypeError("`property` must be a string or a symbol`");
      }
      if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null) {
        throw new $TypeError("`nonEnumerable`, if provided, must be a boolean or null");
      }
      if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null) {
        throw new $TypeError("`nonWritable`, if provided, must be a boolean or null");
      }
      if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null) {
        throw new $TypeError("`nonConfigurable`, if provided, must be a boolean or null");
      }
      if (arguments.length > 6 && typeof arguments[6] !== "boolean") {
        throw new $TypeError("`loose`, if provided, must be a boolean");
      }
      var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
      var nonWritable = arguments.length > 4 ? arguments[4] : null;
      var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
      var loose = arguments.length > 6 ? arguments[6] : false;
      var desc = !!gopd && gopd(obj, property);
      if ($defineProperty) {
        $defineProperty(obj, property, {
          configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
          enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
          value,
          writable: nonWritable === null && desc ? desc.writable : !nonWritable
        });
      } else if (loose || !nonEnumerable && !nonWritable && !nonConfigurable) {
        obj[property] = value;
      } else {
        throw new $SyntaxError("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
      }
    };
  }
});

// node_modules/has-property-descriptors/index.js
var require_has_property_descriptors = __commonJS({
  "node_modules/has-property-descriptors/index.js"(exports2, module2) {
    "use strict";
    var $defineProperty = require_es_define_property();
    var hasPropertyDescriptors = function hasPropertyDescriptors2() {
      return !!$defineProperty;
    };
    hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
      if (!$defineProperty) {
        return null;
      }
      try {
        return $defineProperty([], "length", { value: 1 }).length !== 1;
      } catch (e) {
        return true;
      }
    };
    module2.exports = hasPropertyDescriptors;
  }
});

// node_modules/define-properties/index.js
var require_define_properties = __commonJS({
  "node_modules/define-properties/index.js"(exports2, module2) {
    "use strict";
    var keys = require_object_keys();
    var hasSymbols = typeof Symbol === "function" && typeof Symbol("foo") === "symbol";
    var toStr = Object.prototype.toString;
    var concat = Array.prototype.concat;
    var defineDataProperty = require_define_data_property();
    var isFunction = function(fn) {
      return typeof fn === "function" && toStr.call(fn) === "[object Function]";
    };
    var supportsDescriptors = require_has_property_descriptors()();
    var defineProperty = function(object, name, value, predicate) {
      if (name in object) {
        if (predicate === true) {
          if (object[name] === value) {
            return;
          }
        } else if (!isFunction(predicate) || !predicate()) {
          return;
        }
      }
      if (supportsDescriptors) {
        defineDataProperty(object, name, value, true);
      } else {
        defineDataProperty(object, name, value);
      }
    };
    var defineProperties = function(object, map) {
      var predicates = arguments.length > 2 ? arguments[2] : {};
      var props = keys(map);
      if (hasSymbols) {
        props = concat.call(props, Object.getOwnPropertySymbols(map));
      }
      for (var i = 0; i < props.length; i += 1) {
        defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
      }
    };
    defineProperties.supportsDescriptors = !!supportsDescriptors;
    module2.exports = defineProperties;
  }
});

// node_modules/set-function-length/index.js
var require_set_function_length = __commonJS({
  "node_modules/set-function-length/index.js"(exports2, module2) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var define2 = require_define_data_property();
    var hasDescriptors = require_has_property_descriptors()();
    var gOPD = require_gopd();
    var $TypeError = require_type();
    var $floor = GetIntrinsic("%Math.floor%");
    module2.exports = function setFunctionLength(fn, length) {
      if (typeof fn !== "function") {
        throw new $TypeError("`fn` is not a function");
      }
      if (typeof length !== "number" || length < 0 || length > 4294967295 || $floor(length) !== length) {
        throw new $TypeError("`length` must be a positive 32-bit integer");
      }
      var loose = arguments.length > 2 && !!arguments[2];
      var functionLengthIsConfigurable = true;
      var functionLengthIsWritable = true;
      if ("length" in fn && gOPD) {
        var desc = gOPD(fn, "length");
        if (desc && !desc.configurable) {
          functionLengthIsConfigurable = false;
        }
        if (desc && !desc.writable) {
          functionLengthIsWritable = false;
        }
      }
      if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
        if (hasDescriptors) {
          define2(
            /** @type {Parameters<define>[0]} */
            fn,
            "length",
            length,
            true,
            true
          );
        } else {
          define2(
            /** @type {Parameters<define>[0]} */
            fn,
            "length",
            length
          );
        }
      }
      return fn;
    };
  }
});

// node_modules/call-bind-apply-helpers/applyBind.js
var require_applyBind = __commonJS({
  "node_modules/call-bind-apply-helpers/applyBind.js"(exports2, module2) {
    "use strict";
    var bind = require_function_bind();
    var $apply = require_functionApply();
    var actualApply = require_actualApply();
    module2.exports = function applyBind() {
      return actualApply(bind, $apply, arguments);
    };
  }
});

// node_modules/call-bind/index.js
var require_call_bind = __commonJS({
  "node_modules/call-bind/index.js"(exports2, module2) {
    "use strict";
    var setFunctionLength = require_set_function_length();
    var $defineProperty = require_es_define_property();
    var callBindBasic = require_call_bind_apply_helpers();
    var applyBind = require_applyBind();
    module2.exports = function callBind(originalFunction) {
      var func = callBindBasic(arguments);
      var adjustedLength = originalFunction.length - (arguments.length - 1);
      return setFunctionLength(
        func,
        1 + (adjustedLength > 0 ? adjustedLength : 0),
        true
      );
    };
    if ($defineProperty) {
      $defineProperty(module2.exports, "apply", { value: applyBind });
    } else {
      module2.exports.apply = applyBind;
    }
  }
});

// node_modules/object-is/implementation.js
var require_implementation3 = __commonJS({
  "node_modules/object-is/implementation.js"(exports2, module2) {
    "use strict";
    var numberIsNaN = function(value) {
      return value !== value;
    };
    module2.exports = function is(a, b) {
      if (a === 0 && b === 0) {
        return 1 / a === 1 / b;
      }
      if (a === b) {
        return true;
      }
      if (numberIsNaN(a) && numberIsNaN(b)) {
        return true;
      }
      return false;
    };
  }
});

// node_modules/object-is/polyfill.js
var require_polyfill = __commonJS({
  "node_modules/object-is/polyfill.js"(exports2, module2) {
    "use strict";
    var implementation = require_implementation3();
    module2.exports = function getPolyfill() {
      return typeof Object.is === "function" ? Object.is : implementation;
    };
  }
});

// node_modules/object-is/shim.js
var require_shim = __commonJS({
  "node_modules/object-is/shim.js"(exports2, module2) {
    "use strict";
    var getPolyfill = require_polyfill();
    var define2 = require_define_properties();
    module2.exports = function shimObjectIs() {
      var polyfill = getPolyfill();
      define2(Object, { is: polyfill }, {
        is: function testObjectIs() {
          return Object.is !== polyfill;
        }
      });
      return polyfill;
    };
  }
});

// node_modules/object-is/index.js
var require_object_is = __commonJS({
  "node_modules/object-is/index.js"(exports2, module2) {
    "use strict";
    var define2 = require_define_properties();
    var callBind = require_call_bind();
    var implementation = require_implementation3();
    var getPolyfill = require_polyfill();
    var shim = require_shim();
    var polyfill = callBind(getPolyfill(), Object);
    define2(polyfill, {
      getPolyfill,
      implementation,
      shim
    });
    module2.exports = polyfill;
  }
});

// node_modules/is-regex/index.js
var require_is_regex = __commonJS({
  "node_modules/is-regex/index.js"(exports2, module2) {
    "use strict";
    var callBound = require_call_bound();
    var hasToStringTag = require_shams2()();
    var hasOwn = require_hasown();
    var gOPD = require_gopd();
    var fn;
    if (hasToStringTag) {
      $exec = callBound("RegExp.prototype.exec");
      isRegexMarker = {};
      throwRegexMarker = function() {
        throw isRegexMarker;
      };
      badStringifier = {
        toString: throwRegexMarker,
        valueOf: throwRegexMarker
      };
      if (typeof Symbol.toPrimitive === "symbol") {
        badStringifier[Symbol.toPrimitive] = throwRegexMarker;
      }
      fn = function isRegex(value) {
        if (!value || typeof value !== "object") {
          return false;
        }
        var descriptor = (
          /** @type {NonNullable<typeof gOPD>} */
          gOPD(
            /** @type {{ lastIndex?: unknown }} */
            value,
            "lastIndex"
          )
        );
        var hasLastIndexDataProperty = descriptor && hasOwn(descriptor, "value");
        if (!hasLastIndexDataProperty) {
          return false;
        }
        try {
          $exec(
            value,
            /** @type {string} */
            /** @type {unknown} */
            badStringifier
          );
        } catch (e) {
          return e === isRegexMarker;
        }
      };
    } else {
      $toString = callBound("Object.prototype.toString");
      regexClass = "[object RegExp]";
      fn = function isRegex(value) {
        if (!value || typeof value !== "object" && typeof value !== "function") {
          return false;
        }
        return $toString(value) === regexClass;
      };
    }
    var $exec;
    var isRegexMarker;
    var throwRegexMarker;
    var badStringifier;
    var $toString;
    var regexClass;
    module2.exports = fn;
  }
});

// node_modules/functions-have-names/index.js
var require_functions_have_names = __commonJS({
  "node_modules/functions-have-names/index.js"(exports2, module2) {
    "use strict";
    var functionsHaveNames = function functionsHaveNames2() {
      return typeof function f() {
      }.name === "string";
    };
    var gOPD = Object.getOwnPropertyDescriptor;
    if (gOPD) {
      try {
        gOPD([], "length");
      } catch (e) {
        gOPD = null;
      }
    }
    functionsHaveNames.functionsHaveConfigurableNames = function functionsHaveConfigurableNames() {
      if (!functionsHaveNames() || !gOPD) {
        return false;
      }
      var desc = gOPD(function() {
      }, "name");
      return !!desc && !!desc.configurable;
    };
    var $bind = Function.prototype.bind;
    functionsHaveNames.boundFunctionsHaveNames = function boundFunctionsHaveNames() {
      return functionsHaveNames() && typeof $bind === "function" && function f() {
      }.bind().name !== "";
    };
    module2.exports = functionsHaveNames;
  }
});

// node_modules/set-function-name/index.js
var require_set_function_name = __commonJS({
  "node_modules/set-function-name/index.js"(exports2, module2) {
    "use strict";
    var define2 = require_define_data_property();
    var hasDescriptors = require_has_property_descriptors()();
    var functionsHaveConfigurableNames = require_functions_have_names().functionsHaveConfigurableNames();
    var $TypeError = require_type();
    module2.exports = function setFunctionName(fn, name) {
      if (typeof fn !== "function") {
        throw new $TypeError("`fn` is not a function");
      }
      var loose = arguments.length > 2 && !!arguments[2];
      if (!loose || functionsHaveConfigurableNames) {
        if (hasDescriptors) {
          define2(
            /** @type {Parameters<define>[0]} */
            fn,
            "name",
            name,
            true,
            true
          );
        } else {
          define2(
            /** @type {Parameters<define>[0]} */
            fn,
            "name",
            name
          );
        }
      }
      return fn;
    };
  }
});

// node_modules/regexp.prototype.flags/implementation.js
var require_implementation4 = __commonJS({
  "node_modules/regexp.prototype.flags/implementation.js"(exports2, module2) {
    "use strict";
    var setFunctionName = require_set_function_name();
    var $TypeError = require_type();
    var $Object = Object;
    module2.exports = setFunctionName(function flags() {
      if (this == null || this !== $Object(this)) {
        throw new $TypeError("RegExp.prototype.flags getter called on non-object");
      }
      var result = "";
      if (this.hasIndices) {
        result += "d";
      }
      if (this.global) {
        result += "g";
      }
      if (this.ignoreCase) {
        result += "i";
      }
      if (this.multiline) {
        result += "m";
      }
      if (this.dotAll) {
        result += "s";
      }
      if (this.unicode) {
        result += "u";
      }
      if (this.unicodeSets) {
        result += "v";
      }
      if (this.sticky) {
        result += "y";
      }
      return result;
    }, "get flags", true);
  }
});

// node_modules/regexp.prototype.flags/polyfill.js
var require_polyfill2 = __commonJS({
  "node_modules/regexp.prototype.flags/polyfill.js"(exports2, module2) {
    "use strict";
    var implementation = require_implementation4();
    var supportsDescriptors = require_define_properties().supportsDescriptors;
    var $gOPD = Object.getOwnPropertyDescriptor;
    module2.exports = function getPolyfill() {
      if (supportsDescriptors && /a/mig.flags === "gim") {
        var descriptor = $gOPD(RegExp.prototype, "flags");
        if (descriptor && typeof descriptor.get === "function" && "dotAll" in RegExp.prototype && "hasIndices" in RegExp.prototype) {
          var calls = "";
          var o = {};
          Object.defineProperty(o, "hasIndices", {
            get: function() {
              calls += "d";
            }
          });
          Object.defineProperty(o, "sticky", {
            get: function() {
              calls += "y";
            }
          });
          descriptor.get.call(o);
          if (calls === "dy") {
            return descriptor.get;
          }
        }
      }
      return implementation;
    };
  }
});

// node_modules/regexp.prototype.flags/shim.js
var require_shim2 = __commonJS({
  "node_modules/regexp.prototype.flags/shim.js"(exports2, module2) {
    "use strict";
    var supportsDescriptors = require_define_properties().supportsDescriptors;
    var getPolyfill = require_polyfill2();
    var gOPD = require_gopd();
    var defineProperty = Object.defineProperty;
    var $TypeError = require_es_errors();
    var getProto = require_get_proto();
    var regex = /a/;
    module2.exports = function shimFlags() {
      if (!supportsDescriptors || !getProto) {
        throw new $TypeError("RegExp.prototype.flags requires a true ES5 environment that supports property descriptors");
      }
      var polyfill = getPolyfill();
      var proto = getProto(regex);
      var descriptor = gOPD(proto, "flags");
      if (!descriptor || descriptor.get !== polyfill) {
        defineProperty(proto, "flags", {
          configurable: true,
          enumerable: false,
          get: polyfill
        });
      }
      return polyfill;
    };
  }
});

// node_modules/regexp.prototype.flags/index.js
var require_regexp_prototype = __commonJS({
  "node_modules/regexp.prototype.flags/index.js"(exports2, module2) {
    "use strict";
    var define2 = require_define_properties();
    var callBind = require_call_bind();
    var implementation = require_implementation4();
    var getPolyfill = require_polyfill2();
    var shim = require_shim2();
    var flagsBound = callBind(getPolyfill());
    define2(flagsBound, {
      getPolyfill,
      implementation,
      shim
    });
    module2.exports = flagsBound;
  }
});

// node_modules/is-date-object/index.js
var require_is_date_object = __commonJS({
  "node_modules/is-date-object/index.js"(exports2, module2) {
    "use strict";
    var callBound = require_call_bound();
    var getDay = callBound("Date.prototype.getDay");
    var tryDateObject = function tryDateGetDayCall(value) {
      try {
        getDay(value);
        return true;
      } catch (e) {
        return false;
      }
    };
    var toStr = callBound("Object.prototype.toString");
    var dateClass = "[object Date]";
    var hasToStringTag = require_shams2()();
    module2.exports = function isDateObject(value) {
      if (typeof value !== "object" || value === null) {
        return false;
      }
      return hasToStringTag ? tryDateObject(value) : toStr(value) === dateClass;
    };
  }
});

// node_modules/deep-equal/index.js
var require_deep_equal = __commonJS({
  "node_modules/deep-equal/index.js"(exports2, module2) {
    var objectKeys = require_object_keys();
    var isArguments = require_is_arguments();
    var is = require_object_is();
    var isRegex = require_is_regex();
    var flags = require_regexp_prototype();
    var isDate = require_is_date_object();
    var getTime = Date.prototype.getTime;
    function deepEqual(actual, expected, options) {
      var opts = options || {};
      if (opts.strict ? is(actual, expected) : actual === expected) {
        return true;
      }
      if (!actual || !expected || typeof actual !== "object" && typeof expected !== "object") {
        return opts.strict ? is(actual, expected) : actual == expected;
      }
      return objEquiv(actual, expected, opts);
    }
    function isUndefinedOrNull(value) {
      return value === null || value === void 0;
    }
    function isBuffer(x) {
      if (!x || typeof x !== "object" || typeof x.length !== "number") {
        return false;
      }
      if (typeof x.copy !== "function" || typeof x.slice !== "function") {
        return false;
      }
      if (x.length > 0 && typeof x[0] !== "number") {
        return false;
      }
      return true;
    }
    function objEquiv(a, b, opts) {
      var i, key;
      if (typeof a !== typeof b) {
        return false;
      }
      if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) {
        return false;
      }
      if (a.prototype !== b.prototype) {
        return false;
      }
      if (isArguments(a) !== isArguments(b)) {
        return false;
      }
      var aIsRegex = isRegex(a);
      var bIsRegex = isRegex(b);
      if (aIsRegex !== bIsRegex) {
        return false;
      }
      if (aIsRegex || bIsRegex) {
        return a.source === b.source && flags(a) === flags(b);
      }
      if (isDate(a) && isDate(b)) {
        return getTime.call(a) === getTime.call(b);
      }
      var aIsBuffer = isBuffer(a);
      var bIsBuffer = isBuffer(b);
      if (aIsBuffer !== bIsBuffer) {
        return false;
      }
      if (aIsBuffer || bIsBuffer) {
        if (a.length !== b.length) {
          return false;
        }
        for (i = 0; i < a.length; i++) {
          if (a[i] !== b[i]) {
            return false;
          }
        }
        return true;
      }
      if (typeof a !== typeof b) {
        return false;
      }
      try {
        var ka = objectKeys(a);
        var kb = objectKeys(b);
      } catch (e) {
        return false;
      }
      if (ka.length !== kb.length) {
        return false;
      }
      ka.sort();
      kb.sort();
      for (i = ka.length - 1; i >= 0; i--) {
        if (ka[i] != kb[i]) {
          return false;
        }
      }
      for (i = ka.length - 1; i >= 0; i--) {
        key = ka[i];
        if (!deepEqual(a[key], b[key], opts)) {
          return false;
        }
      }
      return true;
    }
    module2.exports = deepEqual;
  }
});

// node_modules/bonjour/lib/mdns-server.js
var require_mdns_server = __commonJS({
  "node_modules/bonjour/lib/mdns-server.js"(exports2, module2) {
    "use strict";
    var multicastdns = require_multicast_dns();
    var dnsEqual = require_dns_equal();
    var flatten = require_array_flatten();
    var deepEqual = require_deep_equal();
    module2.exports = Server;
    function Server(opts) {
      this.mdns = multicastdns(opts);
      this.mdns.setMaxListeners(0);
      this.registry = {};
      this.mdns.on("query", this._respondToQuery.bind(this));
    }
    Server.prototype.register = function(records) {
      var self = this;
      if (Array.isArray(records)) records.forEach(register);
      else register(records);
      function register(record) {
        var subRegistry = self.registry[record.type];
        if (!subRegistry) subRegistry = self.registry[record.type] = [];
        else if (subRegistry.some(isDuplicateRecord(record))) return;
        subRegistry.push(record);
      }
    };
    Server.prototype.unregister = function(records) {
      var self = this;
      if (Array.isArray(records)) records.forEach(unregister);
      else unregister(records);
      function unregister(record) {
        var type = record.type;
        if (!(type in self.registry)) return;
        self.registry[type] = self.registry[type].filter(function(r) {
          return r.name !== record.name;
        });
      }
    };
    Server.prototype._respondToQuery = function(query) {
      var self = this;
      query.questions.forEach(function(question) {
        var type = question.type;
        var name = question.name;
        var answers = type === "ANY" ? flatten.depth(Object.keys(self.registry).map(self._recordsFor.bind(self, name)), 1) : self._recordsFor(name, type);
        if (answers.length === 0) return;
        var additionals = [];
        if (type !== "ANY") {
          answers.forEach(function(answer) {
            if (answer.type !== "PTR") return;
            additionals = additionals.concat(self._recordsFor(answer.data, "SRV")).concat(self._recordsFor(answer.data, "TXT"));
          });
          additionals.filter(function(record) {
            return record.type === "SRV";
          }).map(function(record) {
            return record.data.target;
          }).filter(unique()).forEach(function(target) {
            additionals = additionals.concat(self._recordsFor(target, "A")).concat(self._recordsFor(target, "AAAA"));
          });
        }
        self.mdns.respond({ answers, additionals }, function(err) {
          if (err) throw err;
        });
      });
    };
    Server.prototype._recordsFor = function(name, type) {
      if (!(type in this.registry)) return [];
      return this.registry[type].filter(function(record) {
        var _name = ~name.indexOf(".") ? record.name : record.name.split(".")[0];
        return dnsEqual(_name, name);
      });
    };
    function isDuplicateRecord(a) {
      return function(b) {
        return a.type === b.type && a.name === b.name && deepEqual(a.data, b.data);
      };
    }
    function unique() {
      var set = [];
      return function(obj) {
        if (~set.indexOf(obj)) return false;
        set.push(obj);
        return true;
      };
    }
  }
});

// node_modules/bonjour/lib/browser.js
var require_browser = __commonJS({
  "node_modules/bonjour/lib/browser.js"(exports2, module2) {
    "use strict";
    var util = require("util");
    var EventEmitter = require("events").EventEmitter;
    var serviceName = require_multicast_dns_service_types();
    var dnsEqual = require_dns_equal();
    var dnsTxt = require_dns_txt();
    var TLD = ".local";
    var WILDCARD = "_services._dns-sd._udp" + TLD;
    module2.exports = Browser;
    util.inherits(Browser, EventEmitter);
    function Browser(mdns, opts, onup) {
      if (typeof opts === "function") return new Browser(mdns, null, opts);
      EventEmitter.call(this);
      this._mdns = mdns;
      this._onresponse = null;
      this._serviceMap = {};
      this._txt = dnsTxt(opts.txt);
      if (!opts || !opts.type) {
        this._name = WILDCARD;
        this._wildcard = true;
      } else {
        this._name = serviceName.stringify(opts.type, opts.protocol || "tcp") + TLD;
        if (opts.name) this._name = opts.name + "." + this._name;
        this._wildcard = false;
      }
      this.services = [];
      if (onup) this.on("up", onup);
      this.start();
    }
    Browser.prototype.start = function() {
      if (this._onresponse) return;
      var self = this;
      var nameMap = {};
      if (!this._wildcard) nameMap[this._name] = true;
      this._onresponse = function(packet, rinfo) {
        if (self._wildcard) {
          packet.answers.forEach(function(answer) {
            if (answer.type !== "PTR" || answer.name !== self._name || answer.name in nameMap) return;
            nameMap[answer.data] = true;
            self._mdns.query(answer.data, "PTR");
          });
        }
        Object.keys(nameMap).forEach(function(name) {
          goodbyes(name, packet).forEach(self._removeService.bind(self));
          var matches = buildServicesFor(name, packet, self._txt, rinfo);
          if (matches.length === 0) return;
          matches.forEach(function(service) {
            if (self._serviceMap[service.fqdn]) return;
            self._addService(service);
          });
        });
      };
      this._mdns.on("response", this._onresponse);
      this.update();
    };
    Browser.prototype.stop = function() {
      if (!this._onresponse) return;
      this._mdns.removeListener("response", this._onresponse);
      this._onresponse = null;
    };
    Browser.prototype.update = function() {
      this._mdns.query(this._name, "PTR");
    };
    Browser.prototype._addService = function(service) {
      this.services.push(service);
      this._serviceMap[service.fqdn] = true;
      this.emit("up", service);
    };
    Browser.prototype._removeService = function(fqdn) {
      var service, index;
      this.services.some(function(s, i) {
        if (dnsEqual(s.fqdn, fqdn)) {
          service = s;
          index = i;
          return true;
        }
      });
      if (!service) return;
      this.services.splice(index, 1);
      delete this._serviceMap[fqdn];
      this.emit("down", service);
    };
    function goodbyes(name, packet) {
      return packet.answers.concat(packet.additionals).filter(function(rr) {
        return rr.type === "PTR" && rr.ttl === 0 && dnsEqual(rr.name, name);
      }).map(function(rr) {
        return rr.data;
      });
    }
    function buildServicesFor(name, packet, txt, referer) {
      var records = packet.answers.concat(packet.additionals).filter(function(rr) {
        return rr.ttl > 0;
      });
      return records.filter(function(rr) {
        return rr.type === "PTR" && dnsEqual(rr.name, name);
      }).map(function(ptr) {
        var service = {
          addresses: []
        };
        records.filter(function(rr) {
          return (rr.type === "SRV" || rr.type === "TXT") && dnsEqual(rr.name, ptr.data);
        }).forEach(function(rr) {
          if (rr.type === "SRV") {
            var parts = rr.name.split(".");
            var name2 = parts[0];
            var types = serviceName.parse(parts.slice(1, -1).join("."));
            service.name = name2;
            service.fqdn = rr.name;
            service.host = rr.data.target;
            service.referer = referer;
            service.port = rr.data.port;
            service.type = types.name;
            service.protocol = types.protocol;
            service.subtypes = types.subtypes;
          } else if (rr.type === "TXT") {
            var txtData = rr.data;
            if (Array.isArray(txtData)) {
              txtData = Buffer.concat(txtData.map(function(chunk) {
                return Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
              }));
            } else if (!Buffer.isBuffer(txtData)) {
              txtData = Buffer.from(txtData);
            }
            service.rawTxt = txtData;
            service.txt = txt.decode(txtData);
          }
        });
        if (!service.name) return;
        records.filter(function(rr) {
          return (rr.type === "A" || rr.type === "AAAA") && dnsEqual(rr.name, service.host);
        }).forEach(function(rr) {
          service.addresses.push(rr.data);
        });
        return service;
      }).filter(function(rr) {
        return !!rr;
      });
    }
  }
});

// node_modules/bonjour/index.js
var require_bonjour = __commonJS({
  "node_modules/bonjour/index.js"(exports2, module2) {
    "use strict";
    var Registry = require_registry();
    var Server = require_mdns_server();
    var Browser = require_browser();
    module2.exports = Bonjour;
    function Bonjour(opts) {
      if (!(this instanceof Bonjour)) return new Bonjour(opts);
      this._server = new Server(opts);
      this._registry = new Registry(this._server);
    }
    Bonjour.prototype.publish = function(opts) {
      return this._registry.publish(opts);
    };
    Bonjour.prototype.unpublishAll = function(cb) {
      this._registry.unpublishAll(cb);
    };
    Bonjour.prototype.find = function(opts, onup) {
      return new Browser(this._server.mdns, opts, onup);
    };
    Bonjour.prototype.findOne = function(opts, cb) {
      var browser = new Browser(this._server.mdns, opts);
      browser.once("up", function(service) {
        browser.stop();
        if (cb) cb(service);
      });
      return browser;
    };
    Bonjour.prototype.destroy = function() {
      this._registry.destroy();
      this._server.mdns.destroy();
    };
  }
});

// node_modules/busboy/lib/utils.js
var require_utils = __commonJS({
  "node_modules/busboy/lib/utils.js"(exports2, module2) {
    "use strict";
    function parseContentType(str) {
      if (str.length === 0)
        return;
      const params = /* @__PURE__ */ Object.create(null);
      let i = 0;
      for (; i < str.length; ++i) {
        const code = str.charCodeAt(i);
        if (TOKEN[code] !== 1) {
          if (code !== 47 || i === 0)
            return;
          break;
        }
      }
      if (i === str.length)
        return;
      const type = str.slice(0, i).toLowerCase();
      const subtypeStart = ++i;
      for (; i < str.length; ++i) {
        const code = str.charCodeAt(i);
        if (TOKEN[code] !== 1) {
          if (i === subtypeStart)
            return;
          if (parseContentTypeParams(str, i, params) === void 0)
            return;
          break;
        }
      }
      if (i === subtypeStart)
        return;
      const subtype = str.slice(subtypeStart, i).toLowerCase();
      return { type, subtype, params };
    }
    function parseContentTypeParams(str, i, params) {
      while (i < str.length) {
        for (; i < str.length; ++i) {
          const code = str.charCodeAt(i);
          if (code !== 32 && code !== 9)
            break;
        }
        if (i === str.length)
          break;
        if (str.charCodeAt(i++) !== 59)
          return;
        for (; i < str.length; ++i) {
          const code = str.charCodeAt(i);
          if (code !== 32 && code !== 9)
            break;
        }
        if (i === str.length)
          return;
        let name;
        const nameStart = i;
        for (; i < str.length; ++i) {
          const code = str.charCodeAt(i);
          if (TOKEN[code] !== 1) {
            if (code !== 61)
              return;
            break;
          }
        }
        if (i === str.length)
          return;
        name = str.slice(nameStart, i);
        ++i;
        if (i === str.length)
          return;
        let value = "";
        let valueStart;
        if (str.charCodeAt(i) === 34) {
          valueStart = ++i;
          let escaping = false;
          for (; i < str.length; ++i) {
            const code = str.charCodeAt(i);
            if (code === 92) {
              if (escaping) {
                valueStart = i;
                escaping = false;
              } else {
                value += str.slice(valueStart, i);
                escaping = true;
              }
              continue;
            }
            if (code === 34) {
              if (escaping) {
                valueStart = i;
                escaping = false;
                continue;
              }
              value += str.slice(valueStart, i);
              break;
            }
            if (escaping) {
              valueStart = i - 1;
              escaping = false;
            }
            if (QDTEXT[code] !== 1)
              return;
          }
          if (i === str.length)
            return;
          ++i;
        } else {
          valueStart = i;
          for (; i < str.length; ++i) {
            const code = str.charCodeAt(i);
            if (TOKEN[code] !== 1) {
              if (i === valueStart)
                return;
              break;
            }
          }
          value = str.slice(valueStart, i);
        }
        name = name.toLowerCase();
        if (params[name] === void 0)
          params[name] = value;
      }
      return params;
    }
    function parseDisposition(str, defDecoder) {
      if (str.length === 0)
        return;
      const params = /* @__PURE__ */ Object.create(null);
      let i = 0;
      for (; i < str.length; ++i) {
        const code = str.charCodeAt(i);
        if (TOKEN[code] !== 1) {
          if (parseDispositionParams(str, i, params, defDecoder) === void 0)
            return;
          break;
        }
      }
      const type = str.slice(0, i).toLowerCase();
      return { type, params };
    }
    function parseDispositionParams(str, i, params, defDecoder) {
      while (i < str.length) {
        for (; i < str.length; ++i) {
          const code = str.charCodeAt(i);
          if (code !== 32 && code !== 9)
            break;
        }
        if (i === str.length)
          break;
        if (str.charCodeAt(i++) !== 59)
          return;
        for (; i < str.length; ++i) {
          const code = str.charCodeAt(i);
          if (code !== 32 && code !== 9)
            break;
        }
        if (i === str.length)
          return;
        let name;
        const nameStart = i;
        for (; i < str.length; ++i) {
          const code = str.charCodeAt(i);
          if (TOKEN[code] !== 1) {
            if (code === 61)
              break;
            return;
          }
        }
        if (i === str.length)
          return;
        let value = "";
        let valueStart;
        let charset;
        name = str.slice(nameStart, i);
        if (name.charCodeAt(name.length - 1) === 42) {
          const charsetStart = ++i;
          for (; i < str.length; ++i) {
            const code = str.charCodeAt(i);
            if (CHARSET[code] !== 1) {
              if (code !== 39)
                return;
              break;
            }
          }
          if (i === str.length)
            return;
          charset = str.slice(charsetStart, i);
          ++i;
          for (; i < str.length; ++i) {
            const code = str.charCodeAt(i);
            if (code === 39)
              break;
          }
          if (i === str.length)
            return;
          ++i;
          if (i === str.length)
            return;
          valueStart = i;
          let encode = 0;
          for (; i < str.length; ++i) {
            const code = str.charCodeAt(i);
            if (EXTENDED_VALUE[code] !== 1) {
              if (code === 37) {
                let hexUpper;
                let hexLower;
                if (i + 2 < str.length && (hexUpper = HEX_VALUES[str.charCodeAt(i + 1)]) !== -1 && (hexLower = HEX_VALUES[str.charCodeAt(i + 2)]) !== -1) {
                  const byteVal = (hexUpper << 4) + hexLower;
                  value += str.slice(valueStart, i);
                  value += String.fromCharCode(byteVal);
                  i += 2;
                  valueStart = i + 1;
                  if (byteVal >= 128)
                    encode = 2;
                  else if (encode === 0)
                    encode = 1;
                  continue;
                }
                return;
              }
              break;
            }
          }
          value += str.slice(valueStart, i);
          value = convertToUTF8(value, charset, encode);
          if (value === void 0)
            return;
        } else {
          ++i;
          if (i === str.length)
            return;
          if (str.charCodeAt(i) === 34) {
            valueStart = ++i;
            let escaping = false;
            for (; i < str.length; ++i) {
              const code = str.charCodeAt(i);
              if (code === 92) {
                if (escaping) {
                  valueStart = i;
                  escaping = false;
                } else {
                  value += str.slice(valueStart, i);
                  escaping = true;
                }
                continue;
              }
              if (code === 34) {
                if (escaping) {
                  valueStart = i;
                  escaping = false;
                  continue;
                }
                value += str.slice(valueStart, i);
                break;
              }
              if (escaping) {
                valueStart = i - 1;
                escaping = false;
              }
              if (QDTEXT[code] !== 1)
                return;
            }
            if (i === str.length)
              return;
            ++i;
          } else {
            valueStart = i;
            for (; i < str.length; ++i) {
              const code = str.charCodeAt(i);
              if (TOKEN[code] !== 1) {
                if (i === valueStart)
                  return;
                break;
              }
            }
            value = str.slice(valueStart, i);
          }
          value = defDecoder(value, 2);
          if (value === void 0)
            return;
        }
        name = name.toLowerCase();
        if (params[name] === void 0)
          params[name] = value;
      }
      return params;
    }
    function getDecoder(charset) {
      let lc;
      while (true) {
        switch (charset) {
          case "utf-8":
          case "utf8":
            return decoders.utf8;
          case "latin1":
          case "ascii":
          // TODO: Make these a separate, strict decoder?
          case "us-ascii":
          case "iso-8859-1":
          case "iso8859-1":
          case "iso88591":
          case "iso_8859-1":
          case "windows-1252":
          case "iso_8859-1:1987":
          case "cp1252":
          case "x-cp1252":
            return decoders.latin1;
          case "utf16le":
          case "utf-16le":
          case "ucs2":
          case "ucs-2":
            return decoders.utf16le;
          case "base64":
            return decoders.base64;
          default:
            if (lc === void 0) {
              lc = true;
              charset = charset.toLowerCase();
              continue;
            }
            return decoders.other.bind(charset);
        }
      }
    }
    var decoders = {
      utf8: (data, hint) => {
        if (data.length === 0)
          return "";
        if (typeof data === "string") {
          if (hint < 2)
            return data;
          data = Buffer.from(data, "latin1");
        }
        return data.utf8Slice(0, data.length);
      },
      latin1: (data, hint) => {
        if (data.length === 0)
          return "";
        if (typeof data === "string")
          return data;
        return data.latin1Slice(0, data.length);
      },
      utf16le: (data, hint) => {
        if (data.length === 0)
          return "";
        if (typeof data === "string")
          data = Buffer.from(data, "latin1");
        return data.ucs2Slice(0, data.length);
      },
      base64: (data, hint) => {
        if (data.length === 0)
          return "";
        if (typeof data === "string")
          data = Buffer.from(data, "latin1");
        return data.base64Slice(0, data.length);
      },
      other: (data, hint) => {
        if (data.length === 0)
          return "";
        if (typeof data === "string")
          data = Buffer.from(data, "latin1");
        try {
          const decoder = new TextDecoder(exports2);
          return decoder.decode(data);
        } catch {
        }
      }
    };
    function convertToUTF8(data, charset, hint) {
      const decode = getDecoder(charset);
      if (decode)
        return decode(data, hint);
    }
    function basename(path2) {
      if (typeof path2 !== "string")
        return "";
      for (let i = path2.length - 1; i >= 0; --i) {
        switch (path2.charCodeAt(i)) {
          case 47:
          // '/'
          case 92:
            path2 = path2.slice(i + 1);
            return path2 === ".." || path2 === "." ? "" : path2;
        }
      }
      return path2 === ".." || path2 === "." ? "" : path2;
    }
    var TOKEN = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      1,
      1,
      0,
      1,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ];
    var QDTEXT = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1
    ];
    var CHARSET = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      1,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ];
    var EXTENDED_VALUE = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      1,
      1,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      1,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ];
    var HEX_VALUES = [
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      10,
      11,
      12,
      13,
      14,
      15,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      10,
      11,
      12,
      13,
      14,
      15,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1
    ];
    module2.exports = {
      basename,
      convertToUTF8,
      getDecoder,
      parseContentType,
      parseDisposition
    };
  }
});

// node_modules/streamsearch/lib/sbmh.js
var require_sbmh = __commonJS({
  "node_modules/streamsearch/lib/sbmh.js"(exports2, module2) {
    "use strict";
    function memcmp(buf1, pos1, buf2, pos2, num) {
      for (let i = 0; i < num; ++i) {
        if (buf1[pos1 + i] !== buf2[pos2 + i])
          return false;
      }
      return true;
    }
    var SBMH = class {
      constructor(needle, cb) {
        if (typeof cb !== "function")
          throw new Error("Missing match callback");
        if (typeof needle === "string")
          needle = Buffer.from(needle);
        else if (!Buffer.isBuffer(needle))
          throw new Error(`Expected Buffer for needle, got ${typeof needle}`);
        const needleLen = needle.length;
        this.maxMatches = Infinity;
        this.matches = 0;
        this._cb = cb;
        this._lookbehindSize = 0;
        this._needle = needle;
        this._bufPos = 0;
        this._lookbehind = Buffer.allocUnsafe(needleLen);
        this._occ = [
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen
        ];
        if (needleLen > 1) {
          for (let i = 0; i < needleLen - 1; ++i)
            this._occ[needle[i]] = needleLen - 1 - i;
        }
      }
      reset() {
        this.matches = 0;
        this._lookbehindSize = 0;
        this._bufPos = 0;
      }
      push(chunk, pos) {
        let result;
        if (!Buffer.isBuffer(chunk))
          chunk = Buffer.from(chunk, "latin1");
        const chunkLen = chunk.length;
        this._bufPos = pos || 0;
        while (result !== chunkLen && this.matches < this.maxMatches)
          result = feed(this, chunk);
        return result;
      }
      destroy() {
        const lbSize = this._lookbehindSize;
        if (lbSize)
          this._cb(false, this._lookbehind, 0, lbSize, false);
        this.reset();
      }
    };
    function feed(self, data) {
      const len = data.length;
      const needle = self._needle;
      const needleLen = needle.length;
      let pos = -self._lookbehindSize;
      const lastNeedleCharPos = needleLen - 1;
      const lastNeedleChar = needle[lastNeedleCharPos];
      const end = len - needleLen;
      const occ = self._occ;
      const lookbehind = self._lookbehind;
      if (pos < 0) {
        while (pos < 0 && pos <= end) {
          const nextPos = pos + lastNeedleCharPos;
          const ch = nextPos < 0 ? lookbehind[self._lookbehindSize + nextPos] : data[nextPos];
          if (ch === lastNeedleChar && matchNeedle(self, data, pos, lastNeedleCharPos)) {
            self._lookbehindSize = 0;
            ++self.matches;
            if (pos > -self._lookbehindSize)
              self._cb(true, lookbehind, 0, self._lookbehindSize + pos, false);
            else
              self._cb(true, void 0, 0, 0, true);
            return self._bufPos = pos + needleLen;
          }
          pos += occ[ch];
        }
        while (pos < 0 && !matchNeedle(self, data, pos, len - pos))
          ++pos;
        if (pos < 0) {
          const bytesToCutOff = self._lookbehindSize + pos;
          if (bytesToCutOff > 0) {
            self._cb(false, lookbehind, 0, bytesToCutOff, false);
          }
          self._lookbehindSize -= bytesToCutOff;
          lookbehind.copy(lookbehind, 0, bytesToCutOff, self._lookbehindSize);
          lookbehind.set(data, self._lookbehindSize);
          self._lookbehindSize += len;
          self._bufPos = len;
          return len;
        }
        self._cb(false, lookbehind, 0, self._lookbehindSize, false);
        self._lookbehindSize = 0;
      }
      pos += self._bufPos;
      const firstNeedleChar = needle[0];
      while (pos <= end) {
        const ch = data[pos + lastNeedleCharPos];
        if (ch === lastNeedleChar && data[pos] === firstNeedleChar && memcmp(needle, 0, data, pos, lastNeedleCharPos)) {
          ++self.matches;
          if (pos > 0)
            self._cb(true, data, self._bufPos, pos, true);
          else
            self._cb(true, void 0, 0, 0, true);
          return self._bufPos = pos + needleLen;
        }
        pos += occ[ch];
      }
      while (pos < len) {
        if (data[pos] !== firstNeedleChar || !memcmp(data, pos, needle, 0, len - pos)) {
          ++pos;
          continue;
        }
        data.copy(lookbehind, 0, pos, len);
        self._lookbehindSize = len - pos;
        break;
      }
      if (pos > 0)
        self._cb(false, data, self._bufPos, pos < len ? pos : len, true);
      self._bufPos = len;
      return len;
    }
    function matchNeedle(self, data, pos, len) {
      const lb = self._lookbehind;
      const lbSize = self._lookbehindSize;
      const needle = self._needle;
      for (let i = 0; i < len; ++i, ++pos) {
        const ch = pos < 0 ? lb[lbSize + pos] : data[pos];
        if (ch !== needle[i])
          return false;
      }
      return true;
    }
    module2.exports = SBMH;
  }
});

// node_modules/busboy/lib/types/multipart.js
var require_multipart = __commonJS({
  "node_modules/busboy/lib/types/multipart.js"(exports2, module2) {
    "use strict";
    var { Readable, Writable } = require("stream");
    var StreamSearch = require_sbmh();
    var {
      basename,
      convertToUTF8,
      getDecoder,
      parseContentType,
      parseDisposition
    } = require_utils();
    var BUF_CRLF = Buffer.from("\r\n");
    var BUF_CR = Buffer.from("\r");
    var BUF_DASH = Buffer.from("-");
    function noop() {
    }
    var MAX_HEADER_PAIRS = 2e3;
    var MAX_HEADER_SIZE = 16 * 1024;
    var HPARSER_NAME = 0;
    var HPARSER_PRE_OWS = 1;
    var HPARSER_VALUE = 2;
    var HeaderParser = class {
      constructor(cb) {
        this.header = /* @__PURE__ */ Object.create(null);
        this.pairCount = 0;
        this.byteCount = 0;
        this.state = HPARSER_NAME;
        this.name = "";
        this.value = "";
        this.crlf = 0;
        this.cb = cb;
      }
      reset() {
        this.header = /* @__PURE__ */ Object.create(null);
        this.pairCount = 0;
        this.byteCount = 0;
        this.state = HPARSER_NAME;
        this.name = "";
        this.value = "";
        this.crlf = 0;
      }
      push(chunk, pos, end) {
        let start = pos;
        while (pos < end) {
          switch (this.state) {
            case HPARSER_NAME: {
              let done = false;
              for (; pos < end; ++pos) {
                if (this.byteCount === MAX_HEADER_SIZE)
                  return -1;
                ++this.byteCount;
                const code = chunk[pos];
                if (TOKEN[code] !== 1) {
                  if (code !== 58)
                    return -1;
                  this.name += chunk.latin1Slice(start, pos);
                  if (this.name.length === 0)
                    return -1;
                  ++pos;
                  done = true;
                  this.state = HPARSER_PRE_OWS;
                  break;
                }
              }
              if (!done) {
                this.name += chunk.latin1Slice(start, pos);
                break;
              }
            }
            case HPARSER_PRE_OWS: {
              let done = false;
              for (; pos < end; ++pos) {
                if (this.byteCount === MAX_HEADER_SIZE)
                  return -1;
                ++this.byteCount;
                const code = chunk[pos];
                if (code !== 32 && code !== 9) {
                  start = pos;
                  done = true;
                  this.state = HPARSER_VALUE;
                  break;
                }
              }
              if (!done)
                break;
            }
            case HPARSER_VALUE:
              switch (this.crlf) {
                case 0:
                  for (; pos < end; ++pos) {
                    if (this.byteCount === MAX_HEADER_SIZE)
                      return -1;
                    ++this.byteCount;
                    const code = chunk[pos];
                    if (FIELD_VCHAR[code] !== 1) {
                      if (code !== 13)
                        return -1;
                      ++this.crlf;
                      break;
                    }
                  }
                  this.value += chunk.latin1Slice(start, pos++);
                  break;
                case 1:
                  if (this.byteCount === MAX_HEADER_SIZE)
                    return -1;
                  ++this.byteCount;
                  if (chunk[pos++] !== 10)
                    return -1;
                  ++this.crlf;
                  break;
                case 2: {
                  if (this.byteCount === MAX_HEADER_SIZE)
                    return -1;
                  ++this.byteCount;
                  const code = chunk[pos];
                  if (code === 32 || code === 9) {
                    start = pos;
                    this.crlf = 0;
                  } else {
                    if (++this.pairCount < MAX_HEADER_PAIRS) {
                      this.name = this.name.toLowerCase();
                      if (this.header[this.name] === void 0)
                        this.header[this.name] = [this.value];
                      else
                        this.header[this.name].push(this.value);
                    }
                    if (code === 13) {
                      ++this.crlf;
                      ++pos;
                    } else {
                      start = pos;
                      this.crlf = 0;
                      this.state = HPARSER_NAME;
                      this.name = "";
                      this.value = "";
                    }
                  }
                  break;
                }
                case 3: {
                  if (this.byteCount === MAX_HEADER_SIZE)
                    return -1;
                  ++this.byteCount;
                  if (chunk[pos++] !== 10)
                    return -1;
                  const header = this.header;
                  this.reset();
                  this.cb(header);
                  return pos;
                }
              }
              break;
          }
        }
        return pos;
      }
    };
    var FileStream = class extends Readable {
      constructor(opts, owner) {
        super(opts);
        this.truncated = false;
        this._readcb = null;
        this.once("end", () => {
          this._read();
          if (--owner._fileEndsLeft === 0 && owner._finalcb) {
            const cb = owner._finalcb;
            owner._finalcb = null;
            process.nextTick(cb);
          }
        });
      }
      _read(n) {
        const cb = this._readcb;
        if (cb) {
          this._readcb = null;
          cb();
        }
      }
    };
    var ignoreData = {
      push: (chunk, pos) => {
      },
      destroy: () => {
      }
    };
    function callAndUnsetCb(self, err) {
      const cb = self._writecb;
      self._writecb = null;
      if (err)
        self.destroy(err);
      else if (cb)
        cb();
    }
    function nullDecoder(val, hint) {
      return val;
    }
    var Multipart = class extends Writable {
      constructor(cfg) {
        const streamOpts = {
          autoDestroy: true,
          emitClose: true,
          highWaterMark: typeof cfg.highWaterMark === "number" ? cfg.highWaterMark : void 0
        };
        super(streamOpts);
        if (!cfg.conType.params || typeof cfg.conType.params.boundary !== "string")
          throw new Error("Multipart: Boundary not found");
        const boundary = cfg.conType.params.boundary;
        const paramDecoder = typeof cfg.defParamCharset === "string" && cfg.defParamCharset ? getDecoder(cfg.defParamCharset) : nullDecoder;
        const defCharset = cfg.defCharset || "utf8";
        const preservePath = cfg.preservePath;
        const fileOpts = {
          autoDestroy: true,
          emitClose: true,
          highWaterMark: typeof cfg.fileHwm === "number" ? cfg.fileHwm : void 0
        };
        const limits = cfg.limits;
        const fieldSizeLimit = limits && typeof limits.fieldSize === "number" ? limits.fieldSize : 1 * 1024 * 1024;
        const fileSizeLimit = limits && typeof limits.fileSize === "number" ? limits.fileSize : Infinity;
        const filesLimit = limits && typeof limits.files === "number" ? limits.files : Infinity;
        const fieldsLimit = limits && typeof limits.fields === "number" ? limits.fields : Infinity;
        const partsLimit = limits && typeof limits.parts === "number" ? limits.parts : Infinity;
        let parts = -1;
        let fields = 0;
        let files = 0;
        let skipPart = false;
        this._fileEndsLeft = 0;
        this._fileStream = void 0;
        this._complete = false;
        let fileSize = 0;
        let field;
        let fieldSize = 0;
        let partCharset;
        let partEncoding;
        let partType;
        let partName;
        let partTruncated = false;
        let hitFilesLimit = false;
        let hitFieldsLimit = false;
        this._hparser = null;
        const hparser = new HeaderParser((header) => {
          this._hparser = null;
          skipPart = false;
          partType = "text/plain";
          partCharset = defCharset;
          partEncoding = "7bit";
          partName = void 0;
          partTruncated = false;
          let filename;
          if (!header["content-disposition"]) {
            skipPart = true;
            return;
          }
          const disp = parseDisposition(
            header["content-disposition"][0],
            paramDecoder
          );
          if (!disp || disp.type !== "form-data") {
            skipPart = true;
            return;
          }
          if (disp.params) {
            if (disp.params.name)
              partName = disp.params.name;
            if (disp.params["filename*"])
              filename = disp.params["filename*"];
            else if (disp.params.filename)
              filename = disp.params.filename;
            if (filename !== void 0 && !preservePath)
              filename = basename(filename);
          }
          if (header["content-type"]) {
            const conType = parseContentType(header["content-type"][0]);
            if (conType) {
              partType = `${conType.type}/${conType.subtype}`;
              if (conType.params && typeof conType.params.charset === "string")
                partCharset = conType.params.charset.toLowerCase();
            }
          }
          if (header["content-transfer-encoding"])
            partEncoding = header["content-transfer-encoding"][0].toLowerCase();
          if (partType === "application/octet-stream" || filename !== void 0) {
            if (files === filesLimit) {
              if (!hitFilesLimit) {
                hitFilesLimit = true;
                this.emit("filesLimit");
              }
              skipPart = true;
              return;
            }
            ++files;
            if (this.listenerCount("file") === 0) {
              skipPart = true;
              return;
            }
            fileSize = 0;
            this._fileStream = new FileStream(fileOpts, this);
            ++this._fileEndsLeft;
            this.emit(
              "file",
              partName,
              this._fileStream,
              {
                filename,
                encoding: partEncoding,
                mimeType: partType
              }
            );
          } else {
            if (fields === fieldsLimit) {
              if (!hitFieldsLimit) {
                hitFieldsLimit = true;
                this.emit("fieldsLimit");
              }
              skipPart = true;
              return;
            }
            ++fields;
            if (this.listenerCount("field") === 0) {
              skipPart = true;
              return;
            }
            field = [];
            fieldSize = 0;
          }
        });
        let matchPostBoundary = 0;
        const ssCb = (isMatch, data, start, end, isDataSafe) => {
          retrydata:
            while (data) {
              if (this._hparser !== null) {
                const ret = this._hparser.push(data, start, end);
                if (ret === -1) {
                  this._hparser = null;
                  hparser.reset();
                  this.emit("error", new Error("Malformed part header"));
                  break;
                }
                start = ret;
              }
              if (start === end)
                break;
              if (matchPostBoundary !== 0) {
                if (matchPostBoundary === 1) {
                  switch (data[start]) {
                    case 45:
                      matchPostBoundary = 2;
                      ++start;
                      break;
                    case 13:
                      matchPostBoundary = 3;
                      ++start;
                      break;
                    default:
                      matchPostBoundary = 0;
                  }
                  if (start === end)
                    return;
                }
                if (matchPostBoundary === 2) {
                  matchPostBoundary = 0;
                  if (data[start] === 45) {
                    this._complete = true;
                    this._bparser = ignoreData;
                    return;
                  }
                  const writecb = this._writecb;
                  this._writecb = noop;
                  ssCb(false, BUF_DASH, 0, 1, false);
                  this._writecb = writecb;
                } else if (matchPostBoundary === 3) {
                  matchPostBoundary = 0;
                  if (data[start] === 10) {
                    ++start;
                    if (parts >= partsLimit)
                      break;
                    this._hparser = hparser;
                    if (start === end)
                      break;
                    continue retrydata;
                  } else {
                    const writecb = this._writecb;
                    this._writecb = noop;
                    ssCb(false, BUF_CR, 0, 1, false);
                    this._writecb = writecb;
                  }
                }
              }
              if (!skipPart) {
                if (this._fileStream) {
                  let chunk;
                  const actualLen = Math.min(end - start, fileSizeLimit - fileSize);
                  if (!isDataSafe) {
                    chunk = Buffer.allocUnsafe(actualLen);
                    data.copy(chunk, 0, start, start + actualLen);
                  } else {
                    chunk = data.slice(start, start + actualLen);
                  }
                  fileSize += chunk.length;
                  if (fileSize === fileSizeLimit) {
                    if (chunk.length > 0)
                      this._fileStream.push(chunk);
                    this._fileStream.emit("limit");
                    this._fileStream.truncated = true;
                    skipPart = true;
                  } else if (!this._fileStream.push(chunk)) {
                    if (this._writecb)
                      this._fileStream._readcb = this._writecb;
                    this._writecb = null;
                  }
                } else if (field !== void 0) {
                  let chunk;
                  const actualLen = Math.min(
                    end - start,
                    fieldSizeLimit - fieldSize
                  );
                  if (!isDataSafe) {
                    chunk = Buffer.allocUnsafe(actualLen);
                    data.copy(chunk, 0, start, start + actualLen);
                  } else {
                    chunk = data.slice(start, start + actualLen);
                  }
                  fieldSize += actualLen;
                  field.push(chunk);
                  if (fieldSize === fieldSizeLimit) {
                    skipPart = true;
                    partTruncated = true;
                  }
                }
              }
              break;
            }
          if (isMatch) {
            matchPostBoundary = 1;
            if (this._fileStream) {
              this._fileStream.push(null);
              this._fileStream = null;
            } else if (field !== void 0) {
              let data2;
              switch (field.length) {
                case 0:
                  data2 = "";
                  break;
                case 1:
                  data2 = convertToUTF8(field[0], partCharset, 0);
                  break;
                default:
                  data2 = convertToUTF8(
                    Buffer.concat(field, fieldSize),
                    partCharset,
                    0
                  );
              }
              field = void 0;
              fieldSize = 0;
              this.emit(
                "field",
                partName,
                data2,
                {
                  nameTruncated: false,
                  valueTruncated: partTruncated,
                  encoding: partEncoding,
                  mimeType: partType
                }
              );
            }
            if (++parts === partsLimit)
              this.emit("partsLimit");
          }
        };
        this._bparser = new StreamSearch(`\r
--${boundary}`, ssCb);
        this._writecb = null;
        this._finalcb = null;
        this.write(BUF_CRLF);
      }
      static detect(conType) {
        return conType.type === "multipart" && conType.subtype === "form-data";
      }
      _write(chunk, enc, cb) {
        this._writecb = cb;
        this._bparser.push(chunk, 0);
        if (this._writecb)
          callAndUnsetCb(this);
      }
      _destroy(err, cb) {
        this._hparser = null;
        this._bparser = ignoreData;
        if (!err)
          err = checkEndState(this);
        const fileStream = this._fileStream;
        if (fileStream) {
          this._fileStream = null;
          fileStream.destroy(err);
        }
        cb(err);
      }
      _final(cb) {
        this._bparser.destroy();
        if (!this._complete)
          return cb(new Error("Unexpected end of form"));
        if (this._fileEndsLeft)
          this._finalcb = finalcb.bind(null, this, cb);
        else
          finalcb(this, cb);
      }
    };
    function finalcb(self, cb, err) {
      if (err)
        return cb(err);
      err = checkEndState(self);
      cb(err);
    }
    function checkEndState(self) {
      if (self._hparser)
        return new Error("Malformed part header");
      const fileStream = self._fileStream;
      if (fileStream) {
        self._fileStream = null;
        fileStream.destroy(new Error("Unexpected end of file"));
      }
      if (!self._complete)
        return new Error("Unexpected end of form");
    }
    var TOKEN = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      1,
      1,
      0,
      1,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ];
    var FIELD_VCHAR = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1
    ];
    module2.exports = Multipart;
  }
});

// node_modules/busboy/lib/types/urlencoded.js
var require_urlencoded = __commonJS({
  "node_modules/busboy/lib/types/urlencoded.js"(exports2, module2) {
    "use strict";
    var { Writable } = require("stream");
    var { getDecoder } = require_utils();
    var URLEncoded = class extends Writable {
      constructor(cfg) {
        const streamOpts = {
          autoDestroy: true,
          emitClose: true,
          highWaterMark: typeof cfg.highWaterMark === "number" ? cfg.highWaterMark : void 0
        };
        super(streamOpts);
        let charset = cfg.defCharset || "utf8";
        if (cfg.conType.params && typeof cfg.conType.params.charset === "string")
          charset = cfg.conType.params.charset;
        this.charset = charset;
        const limits = cfg.limits;
        this.fieldSizeLimit = limits && typeof limits.fieldSize === "number" ? limits.fieldSize : 1 * 1024 * 1024;
        this.fieldsLimit = limits && typeof limits.fields === "number" ? limits.fields : Infinity;
        this.fieldNameSizeLimit = limits && typeof limits.fieldNameSize === "number" ? limits.fieldNameSize : 100;
        this._inKey = true;
        this._keyTrunc = false;
        this._valTrunc = false;
        this._bytesKey = 0;
        this._bytesVal = 0;
        this._fields = 0;
        this._key = "";
        this._val = "";
        this._byte = -2;
        this._lastPos = 0;
        this._encode = 0;
        this._decoder = getDecoder(charset);
      }
      static detect(conType) {
        return conType.type === "application" && conType.subtype === "x-www-form-urlencoded";
      }
      _write(chunk, enc, cb) {
        if (this._fields >= this.fieldsLimit)
          return cb();
        let i = 0;
        const len = chunk.length;
        this._lastPos = 0;
        if (this._byte !== -2) {
          i = readPctEnc(this, chunk, i, len);
          if (i === -1)
            return cb(new Error("Malformed urlencoded form"));
          if (i >= len)
            return cb();
          if (this._inKey)
            ++this._bytesKey;
          else
            ++this._bytesVal;
        }
        main:
          while (i < len) {
            if (this._inKey) {
              i = skipKeyBytes(this, chunk, i, len);
              while (i < len) {
                switch (chunk[i]) {
                  case 61:
                    if (this._lastPos < i)
                      this._key += chunk.latin1Slice(this._lastPos, i);
                    this._lastPos = ++i;
                    this._key = this._decoder(this._key, this._encode);
                    this._encode = 0;
                    this._inKey = false;
                    continue main;
                  case 38:
                    if (this._lastPos < i)
                      this._key += chunk.latin1Slice(this._lastPos, i);
                    this._lastPos = ++i;
                    this._key = this._decoder(this._key, this._encode);
                    this._encode = 0;
                    if (this._bytesKey > 0) {
                      this.emit(
                        "field",
                        this._key,
                        "",
                        {
                          nameTruncated: this._keyTrunc,
                          valueTruncated: false,
                          encoding: this.charset,
                          mimeType: "text/plain"
                        }
                      );
                    }
                    this._key = "";
                    this._val = "";
                    this._keyTrunc = false;
                    this._valTrunc = false;
                    this._bytesKey = 0;
                    this._bytesVal = 0;
                    if (++this._fields >= this.fieldsLimit) {
                      this.emit("fieldsLimit");
                      return cb();
                    }
                    continue;
                  case 43:
                    if (this._lastPos < i)
                      this._key += chunk.latin1Slice(this._lastPos, i);
                    this._key += " ";
                    this._lastPos = i + 1;
                    break;
                  case 37:
                    if (this._encode === 0)
                      this._encode = 1;
                    if (this._lastPos < i)
                      this._key += chunk.latin1Slice(this._lastPos, i);
                    this._lastPos = i + 1;
                    this._byte = -1;
                    i = readPctEnc(this, chunk, i + 1, len);
                    if (i === -1)
                      return cb(new Error("Malformed urlencoded form"));
                    if (i >= len)
                      return cb();
                    ++this._bytesKey;
                    i = skipKeyBytes(this, chunk, i, len);
                    continue;
                }
                ++i;
                ++this._bytesKey;
                i = skipKeyBytes(this, chunk, i, len);
              }
              if (this._lastPos < i)
                this._key += chunk.latin1Slice(this._lastPos, i);
            } else {
              i = skipValBytes(this, chunk, i, len);
              while (i < len) {
                switch (chunk[i]) {
                  case 38:
                    if (this._lastPos < i)
                      this._val += chunk.latin1Slice(this._lastPos, i);
                    this._lastPos = ++i;
                    this._inKey = true;
                    this._val = this._decoder(this._val, this._encode);
                    this._encode = 0;
                    if (this._bytesKey > 0 || this._bytesVal > 0) {
                      this.emit(
                        "field",
                        this._key,
                        this._val,
                        {
                          nameTruncated: this._keyTrunc,
                          valueTruncated: this._valTrunc,
                          encoding: this.charset,
                          mimeType: "text/plain"
                        }
                      );
                    }
                    this._key = "";
                    this._val = "";
                    this._keyTrunc = false;
                    this._valTrunc = false;
                    this._bytesKey = 0;
                    this._bytesVal = 0;
                    if (++this._fields >= this.fieldsLimit) {
                      this.emit("fieldsLimit");
                      return cb();
                    }
                    continue main;
                  case 43:
                    if (this._lastPos < i)
                      this._val += chunk.latin1Slice(this._lastPos, i);
                    this._val += " ";
                    this._lastPos = i + 1;
                    break;
                  case 37:
                    if (this._encode === 0)
                      this._encode = 1;
                    if (this._lastPos < i)
                      this._val += chunk.latin1Slice(this._lastPos, i);
                    this._lastPos = i + 1;
                    this._byte = -1;
                    i = readPctEnc(this, chunk, i + 1, len);
                    if (i === -1)
                      return cb(new Error("Malformed urlencoded form"));
                    if (i >= len)
                      return cb();
                    ++this._bytesVal;
                    i = skipValBytes(this, chunk, i, len);
                    continue;
                }
                ++i;
                ++this._bytesVal;
                i = skipValBytes(this, chunk, i, len);
              }
              if (this._lastPos < i)
                this._val += chunk.latin1Slice(this._lastPos, i);
            }
          }
        cb();
      }
      _final(cb) {
        if (this._byte !== -2)
          return cb(new Error("Malformed urlencoded form"));
        if (!this._inKey || this._bytesKey > 0 || this._bytesVal > 0) {
          if (this._inKey)
            this._key = this._decoder(this._key, this._encode);
          else
            this._val = this._decoder(this._val, this._encode);
          this.emit(
            "field",
            this._key,
            this._val,
            {
              nameTruncated: this._keyTrunc,
              valueTruncated: this._valTrunc,
              encoding: this.charset,
              mimeType: "text/plain"
            }
          );
        }
        cb();
      }
    };
    function readPctEnc(self, chunk, pos, len) {
      if (pos >= len)
        return len;
      if (self._byte === -1) {
        const hexUpper = HEX_VALUES[chunk[pos++]];
        if (hexUpper === -1)
          return -1;
        if (hexUpper >= 8)
          self._encode = 2;
        if (pos < len) {
          const hexLower = HEX_VALUES[chunk[pos++]];
          if (hexLower === -1)
            return -1;
          if (self._inKey)
            self._key += String.fromCharCode((hexUpper << 4) + hexLower);
          else
            self._val += String.fromCharCode((hexUpper << 4) + hexLower);
          self._byte = -2;
          self._lastPos = pos;
        } else {
          self._byte = hexUpper;
        }
      } else {
        const hexLower = HEX_VALUES[chunk[pos++]];
        if (hexLower === -1)
          return -1;
        if (self._inKey)
          self._key += String.fromCharCode((self._byte << 4) + hexLower);
        else
          self._val += String.fromCharCode((self._byte << 4) + hexLower);
        self._byte = -2;
        self._lastPos = pos;
      }
      return pos;
    }
    function skipKeyBytes(self, chunk, pos, len) {
      if (self._bytesKey > self.fieldNameSizeLimit) {
        if (!self._keyTrunc) {
          if (self._lastPos < pos)
            self._key += chunk.latin1Slice(self._lastPos, pos - 1);
        }
        self._keyTrunc = true;
        for (; pos < len; ++pos) {
          const code = chunk[pos];
          if (code === 61 || code === 38)
            break;
          ++self._bytesKey;
        }
        self._lastPos = pos;
      }
      return pos;
    }
    function skipValBytes(self, chunk, pos, len) {
      if (self._bytesVal > self.fieldSizeLimit) {
        if (!self._valTrunc) {
          if (self._lastPos < pos)
            self._val += chunk.latin1Slice(self._lastPos, pos - 1);
        }
        self._valTrunc = true;
        for (; pos < len; ++pos) {
          if (chunk[pos] === 38)
            break;
          ++self._bytesVal;
        }
        self._lastPos = pos;
      }
      return pos;
    }
    var HEX_VALUES = [
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      10,
      11,
      12,
      13,
      14,
      15,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      10,
      11,
      12,
      13,
      14,
      15,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1
    ];
    module2.exports = URLEncoded;
  }
});

// node_modules/busboy/lib/index.js
var require_lib = __commonJS({
  "node_modules/busboy/lib/index.js"(exports2, module2) {
    "use strict";
    var { parseContentType } = require_utils();
    function getInstance(cfg) {
      const headers = cfg.headers;
      const conType = parseContentType(headers["content-type"]);
      if (!conType)
        throw new Error("Malformed content type");
      for (const type of TYPES) {
        const matched = type.detect(conType);
        if (!matched)
          continue;
        const instanceCfg = {
          limits: cfg.limits,
          headers,
          conType,
          highWaterMark: void 0,
          fileHwm: void 0,
          defCharset: void 0,
          defParamCharset: void 0,
          preservePath: false
        };
        if (cfg.highWaterMark)
          instanceCfg.highWaterMark = cfg.highWaterMark;
        if (cfg.fileHwm)
          instanceCfg.fileHwm = cfg.fileHwm;
        instanceCfg.defCharset = cfg.defCharset;
        instanceCfg.defParamCharset = cfg.defParamCharset;
        instanceCfg.preservePath = cfg.preservePath;
        return new type(instanceCfg);
      }
      throw new Error(`Unsupported content type: ${headers["content-type"]}`);
    }
    var TYPES = [
      require_multipart(),
      require_urlencoded()
    ].filter(function(typemod) {
      return typeof typemod.detect === "function";
    });
    module2.exports = (cfg) => {
      if (typeof cfg !== "object" || cfg === null)
        cfg = {};
      if (typeof cfg.headers !== "object" || cfg.headers === null || typeof cfg.headers["content-type"] !== "string") {
        throw new Error("Missing Content-Type");
      }
      return getInstance(cfg);
    };
  }
});

// node_modules/qrcode/lib/can-promise.js
var require_can_promise = __commonJS({
  "node_modules/qrcode/lib/can-promise.js"(exports2, module2) {
    module2.exports = function() {
      return typeof Promise === "function" && Promise.prototype && Promise.prototype.then;
    };
  }
});

// node_modules/qrcode/lib/core/utils.js
var require_utils2 = __commonJS({
  "node_modules/qrcode/lib/core/utils.js"(exports2) {
    var toSJISFunction;
    var CODEWORDS_COUNT = [
      0,
      // Not used
      26,
      44,
      70,
      100,
      134,
      172,
      196,
      242,
      292,
      346,
      404,
      466,
      532,
      581,
      655,
      733,
      815,
      901,
      991,
      1085,
      1156,
      1258,
      1364,
      1474,
      1588,
      1706,
      1828,
      1921,
      2051,
      2185,
      2323,
      2465,
      2611,
      2761,
      2876,
      3034,
      3196,
      3362,
      3532,
      3706
    ];
    exports2.getSymbolSize = function getSymbolSize(version) {
      if (!version) throw new Error('"version" cannot be null or undefined');
      if (version < 1 || version > 40) throw new Error('"version" should be in range from 1 to 40');
      return version * 4 + 17;
    };
    exports2.getSymbolTotalCodewords = function getSymbolTotalCodewords(version) {
      return CODEWORDS_COUNT[version];
    };
    exports2.getBCHDigit = function(data) {
      let digit = 0;
      while (data !== 0) {
        digit++;
        data >>>= 1;
      }
      return digit;
    };
    exports2.setToSJISFunction = function setToSJISFunction(f) {
      if (typeof f !== "function") {
        throw new Error('"toSJISFunc" is not a valid function.');
      }
      toSJISFunction = f;
    };
    exports2.isKanjiModeEnabled = function() {
      return typeof toSJISFunction !== "undefined";
    };
    exports2.toSJIS = function toSJIS(kanji) {
      return toSJISFunction(kanji);
    };
  }
});

// node_modules/qrcode/lib/core/error-correction-level.js
var require_error_correction_level = __commonJS({
  "node_modules/qrcode/lib/core/error-correction-level.js"(exports2) {
    exports2.L = { bit: 1 };
    exports2.M = { bit: 0 };
    exports2.Q = { bit: 3 };
    exports2.H = { bit: 2 };
    function fromString(string) {
      if (typeof string !== "string") {
        throw new Error("Param is not a string");
      }
      const lcStr = string.toLowerCase();
      switch (lcStr) {
        case "l":
        case "low":
          return exports2.L;
        case "m":
        case "medium":
          return exports2.M;
        case "q":
        case "quartile":
          return exports2.Q;
        case "h":
        case "high":
          return exports2.H;
        default:
          throw new Error("Unknown EC Level: " + string);
      }
    }
    exports2.isValid = function isValid(level) {
      return level && typeof level.bit !== "undefined" && level.bit >= 0 && level.bit < 4;
    };
    exports2.from = function from(value, defaultValue) {
      if (exports2.isValid(value)) {
        return value;
      }
      try {
        return fromString(value);
      } catch (e) {
        return defaultValue;
      }
    };
  }
});

// node_modules/qrcode/lib/core/bit-buffer.js
var require_bit_buffer = __commonJS({
  "node_modules/qrcode/lib/core/bit-buffer.js"(exports2, module2) {
    function BitBuffer() {
      this.buffer = [];
      this.length = 0;
    }
    BitBuffer.prototype = {
      get: function(index) {
        const bufIndex = Math.floor(index / 8);
        return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) === 1;
      },
      put: function(num, length) {
        for (let i = 0; i < length; i++) {
          this.putBit((num >>> length - i - 1 & 1) === 1);
        }
      },
      getLengthInBits: function() {
        return this.length;
      },
      putBit: function(bit) {
        const bufIndex = Math.floor(this.length / 8);
        if (this.buffer.length <= bufIndex) {
          this.buffer.push(0);
        }
        if (bit) {
          this.buffer[bufIndex] |= 128 >>> this.length % 8;
        }
        this.length++;
      }
    };
    module2.exports = BitBuffer;
  }
});

// node_modules/qrcode/lib/core/bit-matrix.js
var require_bit_matrix = __commonJS({
  "node_modules/qrcode/lib/core/bit-matrix.js"(exports2, module2) {
    function BitMatrix(size) {
      if (!size || size < 1) {
        throw new Error("BitMatrix size must be defined and greater than 0");
      }
      this.size = size;
      this.data = new Uint8Array(size * size);
      this.reservedBit = new Uint8Array(size * size);
    }
    BitMatrix.prototype.set = function(row, col, value, reserved) {
      const index = row * this.size + col;
      this.data[index] = value;
      if (reserved) this.reservedBit[index] = true;
    };
    BitMatrix.prototype.get = function(row, col) {
      return this.data[row * this.size + col];
    };
    BitMatrix.prototype.xor = function(row, col, value) {
      this.data[row * this.size + col] ^= value;
    };
    BitMatrix.prototype.isReserved = function(row, col) {
      return this.reservedBit[row * this.size + col];
    };
    module2.exports = BitMatrix;
  }
});

// node_modules/qrcode/lib/core/alignment-pattern.js
var require_alignment_pattern = __commonJS({
  "node_modules/qrcode/lib/core/alignment-pattern.js"(exports2) {
    var getSymbolSize = require_utils2().getSymbolSize;
    exports2.getRowColCoords = function getRowColCoords(version) {
      if (version === 1) return [];
      const posCount = Math.floor(version / 7) + 2;
      const size = getSymbolSize(version);
      const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
      const positions = [size - 7];
      for (let i = 1; i < posCount - 1; i++) {
        positions[i] = positions[i - 1] - intervals;
      }
      positions.push(6);
      return positions.reverse();
    };
    exports2.getPositions = function getPositions(version) {
      const coords = [];
      const pos = exports2.getRowColCoords(version);
      const posLength = pos.length;
      for (let i = 0; i < posLength; i++) {
        for (let j = 0; j < posLength; j++) {
          if (i === 0 && j === 0 || // top-left
          i === 0 && j === posLength - 1 || // bottom-left
          i === posLength - 1 && j === 0) {
            continue;
          }
          coords.push([pos[i], pos[j]]);
        }
      }
      return coords;
    };
  }
});

// node_modules/qrcode/lib/core/finder-pattern.js
var require_finder_pattern = __commonJS({
  "node_modules/qrcode/lib/core/finder-pattern.js"(exports2) {
    var getSymbolSize = require_utils2().getSymbolSize;
    var FINDER_PATTERN_SIZE = 7;
    exports2.getPositions = function getPositions(version) {
      const size = getSymbolSize(version);
      return [
        // top-left
        [0, 0],
        // top-right
        [size - FINDER_PATTERN_SIZE, 0],
        // bottom-left
        [0, size - FINDER_PATTERN_SIZE]
      ];
    };
  }
});

// node_modules/qrcode/lib/core/mask-pattern.js
var require_mask_pattern = __commonJS({
  "node_modules/qrcode/lib/core/mask-pattern.js"(exports2) {
    exports2.Patterns = {
      PATTERN000: 0,
      PATTERN001: 1,
      PATTERN010: 2,
      PATTERN011: 3,
      PATTERN100: 4,
      PATTERN101: 5,
      PATTERN110: 6,
      PATTERN111: 7
    };
    var PenaltyScores = {
      N1: 3,
      N2: 3,
      N3: 40,
      N4: 10
    };
    exports2.isValid = function isValid(mask) {
      return mask != null && mask !== "" && !isNaN(mask) && mask >= 0 && mask <= 7;
    };
    exports2.from = function from(value) {
      return exports2.isValid(value) ? parseInt(value, 10) : void 0;
    };
    exports2.getPenaltyN1 = function getPenaltyN1(data) {
      const size = data.size;
      let points = 0;
      let sameCountCol = 0;
      let sameCountRow = 0;
      let lastCol = null;
      let lastRow = null;
      for (let row = 0; row < size; row++) {
        sameCountCol = sameCountRow = 0;
        lastCol = lastRow = null;
        for (let col = 0; col < size; col++) {
          let module3 = data.get(row, col);
          if (module3 === lastCol) {
            sameCountCol++;
          } else {
            if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
            lastCol = module3;
            sameCountCol = 1;
          }
          module3 = data.get(col, row);
          if (module3 === lastRow) {
            sameCountRow++;
          } else {
            if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
            lastRow = module3;
            sameCountRow = 1;
          }
        }
        if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
        if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
      }
      return points;
    };
    exports2.getPenaltyN2 = function getPenaltyN2(data) {
      const size = data.size;
      let points = 0;
      for (let row = 0; row < size - 1; row++) {
        for (let col = 0; col < size - 1; col++) {
          const last = data.get(row, col) + data.get(row, col + 1) + data.get(row + 1, col) + data.get(row + 1, col + 1);
          if (last === 4 || last === 0) points++;
        }
      }
      return points * PenaltyScores.N2;
    };
    exports2.getPenaltyN3 = function getPenaltyN3(data) {
      const size = data.size;
      let points = 0;
      let bitsCol = 0;
      let bitsRow = 0;
      for (let row = 0; row < size; row++) {
        bitsCol = bitsRow = 0;
        for (let col = 0; col < size; col++) {
          bitsCol = bitsCol << 1 & 2047 | data.get(row, col);
          if (col >= 10 && (bitsCol === 1488 || bitsCol === 93)) points++;
          bitsRow = bitsRow << 1 & 2047 | data.get(col, row);
          if (col >= 10 && (bitsRow === 1488 || bitsRow === 93)) points++;
        }
      }
      return points * PenaltyScores.N3;
    };
    exports2.getPenaltyN4 = function getPenaltyN4(data) {
      let darkCount = 0;
      const modulesCount = data.data.length;
      for (let i = 0; i < modulesCount; i++) darkCount += data.data[i];
      const k = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);
      return k * PenaltyScores.N4;
    };
    function getMaskAt(maskPattern, i, j) {
      switch (maskPattern) {
        case exports2.Patterns.PATTERN000:
          return (i + j) % 2 === 0;
        case exports2.Patterns.PATTERN001:
          return i % 2 === 0;
        case exports2.Patterns.PATTERN010:
          return j % 3 === 0;
        case exports2.Patterns.PATTERN011:
          return (i + j) % 3 === 0;
        case exports2.Patterns.PATTERN100:
          return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
        case exports2.Patterns.PATTERN101:
          return i * j % 2 + i * j % 3 === 0;
        case exports2.Patterns.PATTERN110:
          return (i * j % 2 + i * j % 3) % 2 === 0;
        case exports2.Patterns.PATTERN111:
          return (i * j % 3 + (i + j) % 2) % 2 === 0;
        default:
          throw new Error("bad maskPattern:" + maskPattern);
      }
    }
    exports2.applyMask = function applyMask(pattern, data) {
      const size = data.size;
      for (let col = 0; col < size; col++) {
        for (let row = 0; row < size; row++) {
          if (data.isReserved(row, col)) continue;
          data.xor(row, col, getMaskAt(pattern, row, col));
        }
      }
    };
    exports2.getBestMask = function getBestMask(data, setupFormatFunc) {
      const numPatterns = Object.keys(exports2.Patterns).length;
      let bestPattern = 0;
      let lowerPenalty = Infinity;
      for (let p = 0; p < numPatterns; p++) {
        setupFormatFunc(p);
        exports2.applyMask(p, data);
        const penalty = exports2.getPenaltyN1(data) + exports2.getPenaltyN2(data) + exports2.getPenaltyN3(data) + exports2.getPenaltyN4(data);
        exports2.applyMask(p, data);
        if (penalty < lowerPenalty) {
          lowerPenalty = penalty;
          bestPattern = p;
        }
      }
      return bestPattern;
    };
  }
});

// node_modules/qrcode/lib/core/error-correction-code.js
var require_error_correction_code = __commonJS({
  "node_modules/qrcode/lib/core/error-correction-code.js"(exports2) {
    var ECLevel = require_error_correction_level();
    var EC_BLOCKS_TABLE = [
      // L  M  Q  H
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      2,
      2,
      1,
      2,
      2,
      4,
      1,
      2,
      4,
      4,
      2,
      4,
      4,
      4,
      2,
      4,
      6,
      5,
      2,
      4,
      6,
      6,
      2,
      5,
      8,
      8,
      4,
      5,
      8,
      8,
      4,
      5,
      8,
      11,
      4,
      8,
      10,
      11,
      4,
      9,
      12,
      16,
      4,
      9,
      16,
      16,
      6,
      10,
      12,
      18,
      6,
      10,
      17,
      16,
      6,
      11,
      16,
      19,
      6,
      13,
      18,
      21,
      7,
      14,
      21,
      25,
      8,
      16,
      20,
      25,
      8,
      17,
      23,
      25,
      9,
      17,
      23,
      34,
      9,
      18,
      25,
      30,
      10,
      20,
      27,
      32,
      12,
      21,
      29,
      35,
      12,
      23,
      34,
      37,
      12,
      25,
      34,
      40,
      13,
      26,
      35,
      42,
      14,
      28,
      38,
      45,
      15,
      29,
      40,
      48,
      16,
      31,
      43,
      51,
      17,
      33,
      45,
      54,
      18,
      35,
      48,
      57,
      19,
      37,
      51,
      60,
      19,
      38,
      53,
      63,
      20,
      40,
      56,
      66,
      21,
      43,
      59,
      70,
      22,
      45,
      62,
      74,
      24,
      47,
      65,
      77,
      25,
      49,
      68,
      81
    ];
    var EC_CODEWORDS_TABLE = [
      // L  M  Q  H
      7,
      10,
      13,
      17,
      10,
      16,
      22,
      28,
      15,
      26,
      36,
      44,
      20,
      36,
      52,
      64,
      26,
      48,
      72,
      88,
      36,
      64,
      96,
      112,
      40,
      72,
      108,
      130,
      48,
      88,
      132,
      156,
      60,
      110,
      160,
      192,
      72,
      130,
      192,
      224,
      80,
      150,
      224,
      264,
      96,
      176,
      260,
      308,
      104,
      198,
      288,
      352,
      120,
      216,
      320,
      384,
      132,
      240,
      360,
      432,
      144,
      280,
      408,
      480,
      168,
      308,
      448,
      532,
      180,
      338,
      504,
      588,
      196,
      364,
      546,
      650,
      224,
      416,
      600,
      700,
      224,
      442,
      644,
      750,
      252,
      476,
      690,
      816,
      270,
      504,
      750,
      900,
      300,
      560,
      810,
      960,
      312,
      588,
      870,
      1050,
      336,
      644,
      952,
      1110,
      360,
      700,
      1020,
      1200,
      390,
      728,
      1050,
      1260,
      420,
      784,
      1140,
      1350,
      450,
      812,
      1200,
      1440,
      480,
      868,
      1290,
      1530,
      510,
      924,
      1350,
      1620,
      540,
      980,
      1440,
      1710,
      570,
      1036,
      1530,
      1800,
      570,
      1064,
      1590,
      1890,
      600,
      1120,
      1680,
      1980,
      630,
      1204,
      1770,
      2100,
      660,
      1260,
      1860,
      2220,
      720,
      1316,
      1950,
      2310,
      750,
      1372,
      2040,
      2430
    ];
    exports2.getBlocksCount = function getBlocksCount(version, errorCorrectionLevel) {
      switch (errorCorrectionLevel) {
        case ECLevel.L:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 3];
        default:
          return void 0;
      }
    };
    exports2.getTotalCodewordsCount = function getTotalCodewordsCount(version, errorCorrectionLevel) {
      switch (errorCorrectionLevel) {
        case ECLevel.L:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3];
        default:
          return void 0;
      }
    };
  }
});

// node_modules/qrcode/lib/core/galois-field.js
var require_galois_field = __commonJS({
  "node_modules/qrcode/lib/core/galois-field.js"(exports2) {
    var EXP_TABLE = new Uint8Array(512);
    var LOG_TABLE = new Uint8Array(256);
    (function initTables() {
      let x = 1;
      for (let i = 0; i < 255; i++) {
        EXP_TABLE[i] = x;
        LOG_TABLE[x] = i;
        x <<= 1;
        if (x & 256) {
          x ^= 285;
        }
      }
      for (let i = 255; i < 512; i++) {
        EXP_TABLE[i] = EXP_TABLE[i - 255];
      }
    })();
    exports2.log = function log(n) {
      if (n < 1) throw new Error("log(" + n + ")");
      return LOG_TABLE[n];
    };
    exports2.exp = function exp(n) {
      return EXP_TABLE[n];
    };
    exports2.mul = function mul(x, y) {
      if (x === 0 || y === 0) return 0;
      return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]];
    };
  }
});

// node_modules/qrcode/lib/core/polynomial.js
var require_polynomial = __commonJS({
  "node_modules/qrcode/lib/core/polynomial.js"(exports2) {
    var GF = require_galois_field();
    exports2.mul = function mul(p1, p2) {
      const coeff = new Uint8Array(p1.length + p2.length - 1);
      for (let i = 0; i < p1.length; i++) {
        for (let j = 0; j < p2.length; j++) {
          coeff[i + j] ^= GF.mul(p1[i], p2[j]);
        }
      }
      return coeff;
    };
    exports2.mod = function mod(divident, divisor) {
      let result = new Uint8Array(divident);
      while (result.length - divisor.length >= 0) {
        const coeff = result[0];
        for (let i = 0; i < divisor.length; i++) {
          result[i] ^= GF.mul(divisor[i], coeff);
        }
        let offset = 0;
        while (offset < result.length && result[offset] === 0) offset++;
        result = result.slice(offset);
      }
      return result;
    };
    exports2.generateECPolynomial = function generateECPolynomial(degree) {
      let poly = new Uint8Array([1]);
      for (let i = 0; i < degree; i++) {
        poly = exports2.mul(poly, new Uint8Array([1, GF.exp(i)]));
      }
      return poly;
    };
  }
});

// node_modules/qrcode/lib/core/reed-solomon-encoder.js
var require_reed_solomon_encoder = __commonJS({
  "node_modules/qrcode/lib/core/reed-solomon-encoder.js"(exports2, module2) {
    var Polynomial = require_polynomial();
    function ReedSolomonEncoder(degree) {
      this.genPoly = void 0;
      this.degree = degree;
      if (this.degree) this.initialize(this.degree);
    }
    ReedSolomonEncoder.prototype.initialize = function initialize(degree) {
      this.degree = degree;
      this.genPoly = Polynomial.generateECPolynomial(this.degree);
    };
    ReedSolomonEncoder.prototype.encode = function encode(data) {
      if (!this.genPoly) {
        throw new Error("Encoder not initialized");
      }
      const paddedData = new Uint8Array(data.length + this.degree);
      paddedData.set(data);
      const remainder = Polynomial.mod(paddedData, this.genPoly);
      const start = this.degree - remainder.length;
      if (start > 0) {
        const buff = new Uint8Array(this.degree);
        buff.set(remainder, start);
        return buff;
      }
      return remainder;
    };
    module2.exports = ReedSolomonEncoder;
  }
});

// node_modules/qrcode/lib/core/version-check.js
var require_version_check = __commonJS({
  "node_modules/qrcode/lib/core/version-check.js"(exports2) {
    exports2.isValid = function isValid(version) {
      return !isNaN(version) && version >= 1 && version <= 40;
    };
  }
});

// node_modules/qrcode/lib/core/regex.js
var require_regex = __commonJS({
  "node_modules/qrcode/lib/core/regex.js"(exports2) {
    var numeric = "[0-9]+";
    var alphanumeric = "[A-Z $%*+\\-./:]+";
    var kanji = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
    kanji = kanji.replace(/u/g, "\\u");
    var byte = "(?:(?![A-Z0-9 $%*+\\-./:]|" + kanji + ")(?:.|[\r\n]))+";
    exports2.KANJI = new RegExp(kanji, "g");
    exports2.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g");
    exports2.BYTE = new RegExp(byte, "g");
    exports2.NUMERIC = new RegExp(numeric, "g");
    exports2.ALPHANUMERIC = new RegExp(alphanumeric, "g");
    var TEST_KANJI = new RegExp("^" + kanji + "$");
    var TEST_NUMERIC = new RegExp("^" + numeric + "$");
    var TEST_ALPHANUMERIC = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
    exports2.testKanji = function testKanji(str) {
      return TEST_KANJI.test(str);
    };
    exports2.testNumeric = function testNumeric(str) {
      return TEST_NUMERIC.test(str);
    };
    exports2.testAlphanumeric = function testAlphanumeric(str) {
      return TEST_ALPHANUMERIC.test(str);
    };
  }
});

// node_modules/qrcode/lib/core/mode.js
var require_mode = __commonJS({
  "node_modules/qrcode/lib/core/mode.js"(exports2) {
    var VersionCheck = require_version_check();
    var Regex = require_regex();
    exports2.NUMERIC = {
      id: "Numeric",
      bit: 1 << 0,
      ccBits: [10, 12, 14]
    };
    exports2.ALPHANUMERIC = {
      id: "Alphanumeric",
      bit: 1 << 1,
      ccBits: [9, 11, 13]
    };
    exports2.BYTE = {
      id: "Byte",
      bit: 1 << 2,
      ccBits: [8, 16, 16]
    };
    exports2.KANJI = {
      id: "Kanji",
      bit: 1 << 3,
      ccBits: [8, 10, 12]
    };
    exports2.MIXED = {
      bit: -1
    };
    exports2.getCharCountIndicator = function getCharCountIndicator(mode, version) {
      if (!mode.ccBits) throw new Error("Invalid mode: " + mode);
      if (!VersionCheck.isValid(version)) {
        throw new Error("Invalid version: " + version);
      }
      if (version >= 1 && version < 10) return mode.ccBits[0];
      else if (version < 27) return mode.ccBits[1];
      return mode.ccBits[2];
    };
    exports2.getBestModeForData = function getBestModeForData(dataStr) {
      if (Regex.testNumeric(dataStr)) return exports2.NUMERIC;
      else if (Regex.testAlphanumeric(dataStr)) return exports2.ALPHANUMERIC;
      else if (Regex.testKanji(dataStr)) return exports2.KANJI;
      else return exports2.BYTE;
    };
    exports2.toString = function toString(mode) {
      if (mode && mode.id) return mode.id;
      throw new Error("Invalid mode");
    };
    exports2.isValid = function isValid(mode) {
      return mode && mode.bit && mode.ccBits;
    };
    function fromString(string) {
      if (typeof string !== "string") {
        throw new Error("Param is not a string");
      }
      const lcStr = string.toLowerCase();
      switch (lcStr) {
        case "numeric":
          return exports2.NUMERIC;
        case "alphanumeric":
          return exports2.ALPHANUMERIC;
        case "kanji":
          return exports2.KANJI;
        case "byte":
          return exports2.BYTE;
        default:
          throw new Error("Unknown mode: " + string);
      }
    }
    exports2.from = function from(value, defaultValue) {
      if (exports2.isValid(value)) {
        return value;
      }
      try {
        return fromString(value);
      } catch (e) {
        return defaultValue;
      }
    };
  }
});

// node_modules/qrcode/lib/core/version.js
var require_version = __commonJS({
  "node_modules/qrcode/lib/core/version.js"(exports2) {
    var Utils = require_utils2();
    var ECCode = require_error_correction_code();
    var ECLevel = require_error_correction_level();
    var Mode = require_mode();
    var VersionCheck = require_version_check();
    var G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
    var G18_BCH = Utils.getBCHDigit(G18);
    function getBestVersionForDataLength(mode, length, errorCorrectionLevel) {
      for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
        if (length <= exports2.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
          return currentVersion;
        }
      }
      return void 0;
    }
    function getReservedBitsCount(mode, version) {
      return Mode.getCharCountIndicator(mode, version) + 4;
    }
    function getTotalBitsFromDataArray(segments, version) {
      let totalBits = 0;
      segments.forEach(function(data) {
        const reservedBits = getReservedBitsCount(data.mode, version);
        totalBits += reservedBits + data.getBitsLength();
      });
      return totalBits;
    }
    function getBestVersionForMixedData(segments, errorCorrectionLevel) {
      for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
        const length = getTotalBitsFromDataArray(segments, currentVersion);
        if (length <= exports2.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {
          return currentVersion;
        }
      }
      return void 0;
    }
    exports2.from = function from(value, defaultValue) {
      if (VersionCheck.isValid(value)) {
        return parseInt(value, 10);
      }
      return defaultValue;
    };
    exports2.getCapacity = function getCapacity(version, errorCorrectionLevel, mode) {
      if (!VersionCheck.isValid(version)) {
        throw new Error("Invalid QR Code version");
      }
      if (typeof mode === "undefined") mode = Mode.BYTE;
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
      if (mode === Mode.MIXED) return dataTotalCodewordsBits;
      const usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version);
      switch (mode) {
        case Mode.NUMERIC:
          return Math.floor(usableBits / 10 * 3);
        case Mode.ALPHANUMERIC:
          return Math.floor(usableBits / 11 * 2);
        case Mode.KANJI:
          return Math.floor(usableBits / 13);
        case Mode.BYTE:
        default:
          return Math.floor(usableBits / 8);
      }
    };
    exports2.getBestVersionForData = function getBestVersionForData(data, errorCorrectionLevel) {
      let seg;
      const ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M);
      if (Array.isArray(data)) {
        if (data.length > 1) {
          return getBestVersionForMixedData(data, ecl);
        }
        if (data.length === 0) {
          return 1;
        }
        seg = data[0];
      } else {
        seg = data;
      }
      return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl);
    };
    exports2.getEncodedBits = function getEncodedBits(version) {
      if (!VersionCheck.isValid(version) || version < 7) {
        throw new Error("Invalid QR Code version");
      }
      let d = version << 12;
      while (Utils.getBCHDigit(d) - G18_BCH >= 0) {
        d ^= G18 << Utils.getBCHDigit(d) - G18_BCH;
      }
      return version << 12 | d;
    };
  }
});

// node_modules/qrcode/lib/core/format-info.js
var require_format_info = __commonJS({
  "node_modules/qrcode/lib/core/format-info.js"(exports2) {
    var Utils = require_utils2();
    var G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
    var G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
    var G15_BCH = Utils.getBCHDigit(G15);
    exports2.getEncodedBits = function getEncodedBits(errorCorrectionLevel, mask) {
      const data = errorCorrectionLevel.bit << 3 | mask;
      let d = data << 10;
      while (Utils.getBCHDigit(d) - G15_BCH >= 0) {
        d ^= G15 << Utils.getBCHDigit(d) - G15_BCH;
      }
      return (data << 10 | d) ^ G15_MASK;
    };
  }
});

// node_modules/qrcode/lib/core/numeric-data.js
var require_numeric_data = __commonJS({
  "node_modules/qrcode/lib/core/numeric-data.js"(exports2, module2) {
    var Mode = require_mode();
    function NumericData(data) {
      this.mode = Mode.NUMERIC;
      this.data = data.toString();
    }
    NumericData.getBitsLength = function getBitsLength(length) {
      return 10 * Math.floor(length / 3) + (length % 3 ? length % 3 * 3 + 1 : 0);
    };
    NumericData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    NumericData.prototype.getBitsLength = function getBitsLength() {
      return NumericData.getBitsLength(this.data.length);
    };
    NumericData.prototype.write = function write(bitBuffer) {
      let i, group, value;
      for (i = 0; i + 3 <= this.data.length; i += 3) {
        group = this.data.substr(i, 3);
        value = parseInt(group, 10);
        bitBuffer.put(value, 10);
      }
      const remainingNum = this.data.length - i;
      if (remainingNum > 0) {
        group = this.data.substr(i);
        value = parseInt(group, 10);
        bitBuffer.put(value, remainingNum * 3 + 1);
      }
    };
    module2.exports = NumericData;
  }
});

// node_modules/qrcode/lib/core/alphanumeric-data.js
var require_alphanumeric_data = __commonJS({
  "node_modules/qrcode/lib/core/alphanumeric-data.js"(exports2, module2) {
    var Mode = require_mode();
    var ALPHA_NUM_CHARS = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      " ",
      "$",
      "%",
      "*",
      "+",
      "-",
      ".",
      "/",
      ":"
    ];
    function AlphanumericData(data) {
      this.mode = Mode.ALPHANUMERIC;
      this.data = data;
    }
    AlphanumericData.getBitsLength = function getBitsLength(length) {
      return 11 * Math.floor(length / 2) + 6 * (length % 2);
    };
    AlphanumericData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    AlphanumericData.prototype.getBitsLength = function getBitsLength() {
      return AlphanumericData.getBitsLength(this.data.length);
    };
    AlphanumericData.prototype.write = function write(bitBuffer) {
      let i;
      for (i = 0; i + 2 <= this.data.length; i += 2) {
        let value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45;
        value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1]);
        bitBuffer.put(value, 11);
      }
      if (this.data.length % 2) {
        bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6);
      }
    };
    module2.exports = AlphanumericData;
  }
});

// node_modules/qrcode/lib/core/byte-data.js
var require_byte_data = __commonJS({
  "node_modules/qrcode/lib/core/byte-data.js"(exports2, module2) {
    var Mode = require_mode();
    function ByteData(data) {
      this.mode = Mode.BYTE;
      if (typeof data === "string") {
        this.data = new TextEncoder().encode(data);
      } else {
        this.data = new Uint8Array(data);
      }
    }
    ByteData.getBitsLength = function getBitsLength(length) {
      return length * 8;
    };
    ByteData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    ByteData.prototype.getBitsLength = function getBitsLength() {
      return ByteData.getBitsLength(this.data.length);
    };
    ByteData.prototype.write = function(bitBuffer) {
      for (let i = 0, l = this.data.length; i < l; i++) {
        bitBuffer.put(this.data[i], 8);
      }
    };
    module2.exports = ByteData;
  }
});

// node_modules/qrcode/lib/core/kanji-data.js
var require_kanji_data = __commonJS({
  "node_modules/qrcode/lib/core/kanji-data.js"(exports2, module2) {
    var Mode = require_mode();
    var Utils = require_utils2();
    function KanjiData(data) {
      this.mode = Mode.KANJI;
      this.data = data;
    }
    KanjiData.getBitsLength = function getBitsLength(length) {
      return length * 13;
    };
    KanjiData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    KanjiData.prototype.getBitsLength = function getBitsLength() {
      return KanjiData.getBitsLength(this.data.length);
    };
    KanjiData.prototype.write = function(bitBuffer) {
      let i;
      for (i = 0; i < this.data.length; i++) {
        let value = Utils.toSJIS(this.data[i]);
        if (value >= 33088 && value <= 40956) {
          value -= 33088;
        } else if (value >= 57408 && value <= 60351) {
          value -= 49472;
        } else {
          throw new Error(
            "Invalid SJIS character: " + this.data[i] + "\nMake sure your charset is UTF-8"
          );
        }
        value = (value >>> 8 & 255) * 192 + (value & 255);
        bitBuffer.put(value, 13);
      }
    };
    module2.exports = KanjiData;
  }
});

// node_modules/dijkstrajs/dijkstra.js
var require_dijkstra = __commonJS({
  "node_modules/dijkstrajs/dijkstra.js"(exports2, module2) {
    "use strict";
    var dijkstra = {
      single_source_shortest_paths: function(graph, s, d) {
        var predecessors = {};
        var costs = {};
        costs[s] = 0;
        var open = dijkstra.PriorityQueue.make();
        open.push(s, 0);
        var closest, u, v, cost_of_s_to_u, adjacent_nodes, cost_of_e, cost_of_s_to_u_plus_cost_of_e, cost_of_s_to_v, first_visit;
        while (!open.empty()) {
          closest = open.pop();
          u = closest.value;
          cost_of_s_to_u = closest.cost;
          adjacent_nodes = graph[u] || {};
          for (v in adjacent_nodes) {
            if (adjacent_nodes.hasOwnProperty(v)) {
              cost_of_e = adjacent_nodes[v];
              cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;
              cost_of_s_to_v = costs[v];
              first_visit = typeof costs[v] === "undefined";
              if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
                costs[v] = cost_of_s_to_u_plus_cost_of_e;
                open.push(v, cost_of_s_to_u_plus_cost_of_e);
                predecessors[v] = u;
              }
            }
          }
        }
        if (typeof d !== "undefined" && typeof costs[d] === "undefined") {
          var msg = ["Could not find a path from ", s, " to ", d, "."].join("");
          throw new Error(msg);
        }
        return predecessors;
      },
      extract_shortest_path_from_predecessor_list: function(predecessors, d) {
        var nodes = [];
        var u = d;
        var predecessor;
        while (u) {
          nodes.push(u);
          predecessor = predecessors[u];
          u = predecessors[u];
        }
        nodes.reverse();
        return nodes;
      },
      find_path: function(graph, s, d) {
        var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
        return dijkstra.extract_shortest_path_from_predecessor_list(
          predecessors,
          d
        );
      },
      /**
       * A very naive priority queue implementation.
       */
      PriorityQueue: {
        make: function(opts) {
          var T = dijkstra.PriorityQueue, t = {}, key;
          opts = opts || {};
          for (key in T) {
            if (T.hasOwnProperty(key)) {
              t[key] = T[key];
            }
          }
          t.queue = [];
          t.sorter = opts.sorter || T.default_sorter;
          return t;
        },
        default_sorter: function(a, b) {
          return a.cost - b.cost;
        },
        /**
         * Add a new item to the queue and ensure the highest priority element
         * is at the front of the queue.
         */
        push: function(value, cost) {
          var item = { value, cost };
          this.queue.push(item);
          this.queue.sort(this.sorter);
        },
        /**
         * Return the highest priority element in the queue.
         */
        pop: function() {
          return this.queue.shift();
        },
        empty: function() {
          return this.queue.length === 0;
        }
      }
    };
    if (typeof module2 !== "undefined") {
      module2.exports = dijkstra;
    }
  }
});

// node_modules/qrcode/lib/core/segments.js
var require_segments = __commonJS({
  "node_modules/qrcode/lib/core/segments.js"(exports2) {
    var Mode = require_mode();
    var NumericData = require_numeric_data();
    var AlphanumericData = require_alphanumeric_data();
    var ByteData = require_byte_data();
    var KanjiData = require_kanji_data();
    var Regex = require_regex();
    var Utils = require_utils2();
    var dijkstra = require_dijkstra();
    function getStringByteLength(str) {
      return unescape(encodeURIComponent(str)).length;
    }
    function getSegments(regex, mode, str) {
      const segments = [];
      let result;
      while ((result = regex.exec(str)) !== null) {
        segments.push({
          data: result[0],
          index: result.index,
          mode,
          length: result[0].length
        });
      }
      return segments;
    }
    function getSegmentsFromString(dataStr) {
      const numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr);
      const alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr);
      let byteSegs;
      let kanjiSegs;
      if (Utils.isKanjiModeEnabled()) {
        byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr);
        kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr);
      } else {
        byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr);
        kanjiSegs = [];
      }
      const segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);
      return segs.sort(function(s1, s2) {
        return s1.index - s2.index;
      }).map(function(obj) {
        return {
          data: obj.data,
          mode: obj.mode,
          length: obj.length
        };
      });
    }
    function getSegmentBitsLength(length, mode) {
      switch (mode) {
        case Mode.NUMERIC:
          return NumericData.getBitsLength(length);
        case Mode.ALPHANUMERIC:
          return AlphanumericData.getBitsLength(length);
        case Mode.KANJI:
          return KanjiData.getBitsLength(length);
        case Mode.BYTE:
          return ByteData.getBitsLength(length);
      }
    }
    function mergeSegments(segs) {
      return segs.reduce(function(acc, curr) {
        const prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;
        if (prevSeg && prevSeg.mode === curr.mode) {
          acc[acc.length - 1].data += curr.data;
          return acc;
        }
        acc.push(curr);
        return acc;
      }, []);
    }
    function buildNodes(segs) {
      const nodes = [];
      for (let i = 0; i < segs.length; i++) {
        const seg = segs[i];
        switch (seg.mode) {
          case Mode.NUMERIC:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.ALPHANUMERIC, length: seg.length },
              { data: seg.data, mode: Mode.BYTE, length: seg.length }
            ]);
            break;
          case Mode.ALPHANUMERIC:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.BYTE, length: seg.length }
            ]);
            break;
          case Mode.KANJI:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
            ]);
            break;
          case Mode.BYTE:
            nodes.push([
              { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
            ]);
        }
      }
      return nodes;
    }
    function buildGraph(nodes, version) {
      const table = {};
      const graph = { start: {} };
      let prevNodeIds = ["start"];
      for (let i = 0; i < nodes.length; i++) {
        const nodeGroup = nodes[i];
        const currentNodeIds = [];
        for (let j = 0; j < nodeGroup.length; j++) {
          const node = nodeGroup[j];
          const key = "" + i + j;
          currentNodeIds.push(key);
          table[key] = { node, lastCount: 0 };
          graph[key] = {};
          for (let n = 0; n < prevNodeIds.length; n++) {
            const prevNodeId = prevNodeIds[n];
            if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
              graph[prevNodeId][key] = getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) - getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);
              table[prevNodeId].lastCount += node.length;
            } else {
              if (table[prevNodeId]) table[prevNodeId].lastCount = node.length;
              graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) + 4 + Mode.getCharCountIndicator(node.mode, version);
            }
          }
        }
        prevNodeIds = currentNodeIds;
      }
      for (let n = 0; n < prevNodeIds.length; n++) {
        graph[prevNodeIds[n]].end = 0;
      }
      return { map: graph, table };
    }
    function buildSingleSegment(data, modesHint) {
      let mode;
      const bestMode = Mode.getBestModeForData(data);
      mode = Mode.from(modesHint, bestMode);
      if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {
        throw new Error('"' + data + '" cannot be encoded with mode ' + Mode.toString(mode) + ".\n Suggested mode is: " + Mode.toString(bestMode));
      }
      if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {
        mode = Mode.BYTE;
      }
      switch (mode) {
        case Mode.NUMERIC:
          return new NumericData(data);
        case Mode.ALPHANUMERIC:
          return new AlphanumericData(data);
        case Mode.KANJI:
          return new KanjiData(data);
        case Mode.BYTE:
          return new ByteData(data);
      }
    }
    exports2.fromArray = function fromArray(array) {
      return array.reduce(function(acc, seg) {
        if (typeof seg === "string") {
          acc.push(buildSingleSegment(seg, null));
        } else if (seg.data) {
          acc.push(buildSingleSegment(seg.data, seg.mode));
        }
        return acc;
      }, []);
    };
    exports2.fromString = function fromString(data, version) {
      const segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled());
      const nodes = buildNodes(segs);
      const graph = buildGraph(nodes, version);
      const path2 = dijkstra.find_path(graph.map, "start", "end");
      const optimizedSegs = [];
      for (let i = 1; i < path2.length - 1; i++) {
        optimizedSegs.push(graph.table[path2[i]].node);
      }
      return exports2.fromArray(mergeSegments(optimizedSegs));
    };
    exports2.rawSplit = function rawSplit(data) {
      return exports2.fromArray(
        getSegmentsFromString(data, Utils.isKanjiModeEnabled())
      );
    };
  }
});

// node_modules/qrcode/lib/core/qrcode.js
var require_qrcode = __commonJS({
  "node_modules/qrcode/lib/core/qrcode.js"(exports2) {
    var Utils = require_utils2();
    var ECLevel = require_error_correction_level();
    var BitBuffer = require_bit_buffer();
    var BitMatrix = require_bit_matrix();
    var AlignmentPattern = require_alignment_pattern();
    var FinderPattern = require_finder_pattern();
    var MaskPattern = require_mask_pattern();
    var ECCode = require_error_correction_code();
    var ReedSolomonEncoder = require_reed_solomon_encoder();
    var Version = require_version();
    var FormatInfo = require_format_info();
    var Mode = require_mode();
    var Segments = require_segments();
    function setupFinderPattern(matrix, version) {
      const size = matrix.size;
      const pos = FinderPattern.getPositions(version);
      for (let i = 0; i < pos.length; i++) {
        const row = pos[i][0];
        const col = pos[i][1];
        for (let r = -1; r <= 7; r++) {
          if (row + r <= -1 || size <= row + r) continue;
          for (let c = -1; c <= 7; c++) {
            if (col + c <= -1 || size <= col + c) continue;
            if (r >= 0 && r <= 6 && (c === 0 || c === 6) || c >= 0 && c <= 6 && (r === 0 || r === 6) || r >= 2 && r <= 4 && c >= 2 && c <= 4) {
              matrix.set(row + r, col + c, true, true);
            } else {
              matrix.set(row + r, col + c, false, true);
            }
          }
        }
      }
    }
    function setupTimingPattern(matrix) {
      const size = matrix.size;
      for (let r = 8; r < size - 8; r++) {
        const value = r % 2 === 0;
        matrix.set(r, 6, value, true);
        matrix.set(6, r, value, true);
      }
    }
    function setupAlignmentPattern(matrix, version) {
      const pos = AlignmentPattern.getPositions(version);
      for (let i = 0; i < pos.length; i++) {
        const row = pos[i][0];
        const col = pos[i][1];
        for (let r = -2; r <= 2; r++) {
          for (let c = -2; c <= 2; c++) {
            if (r === -2 || r === 2 || c === -2 || c === 2 || r === 0 && c === 0) {
              matrix.set(row + r, col + c, true, true);
            } else {
              matrix.set(row + r, col + c, false, true);
            }
          }
        }
      }
    }
    function setupVersionInfo(matrix, version) {
      const size = matrix.size;
      const bits = Version.getEncodedBits(version);
      let row, col, mod;
      for (let i = 0; i < 18; i++) {
        row = Math.floor(i / 3);
        col = i % 3 + size - 8 - 3;
        mod = (bits >> i & 1) === 1;
        matrix.set(row, col, mod, true);
        matrix.set(col, row, mod, true);
      }
    }
    function setupFormatInfo(matrix, errorCorrectionLevel, maskPattern) {
      const size = matrix.size;
      const bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
      let i, mod;
      for (i = 0; i < 15; i++) {
        mod = (bits >> i & 1) === 1;
        if (i < 6) {
          matrix.set(i, 8, mod, true);
        } else if (i < 8) {
          matrix.set(i + 1, 8, mod, true);
        } else {
          matrix.set(size - 15 + i, 8, mod, true);
        }
        if (i < 8) {
          matrix.set(8, size - i - 1, mod, true);
        } else if (i < 9) {
          matrix.set(8, 15 - i - 1 + 1, mod, true);
        } else {
          matrix.set(8, 15 - i - 1, mod, true);
        }
      }
      matrix.set(size - 8, 8, 1, true);
    }
    function setupData(matrix, data) {
      const size = matrix.size;
      let inc = -1;
      let row = size - 1;
      let bitIndex = 7;
      let byteIndex = 0;
      for (let col = size - 1; col > 0; col -= 2) {
        if (col === 6) col--;
        while (true) {
          for (let c = 0; c < 2; c++) {
            if (!matrix.isReserved(row, col - c)) {
              let dark = false;
              if (byteIndex < data.length) {
                dark = (data[byteIndex] >>> bitIndex & 1) === 1;
              }
              matrix.set(row, col - c, dark);
              bitIndex--;
              if (bitIndex === -1) {
                byteIndex++;
                bitIndex = 7;
              }
            }
          }
          row += inc;
          if (row < 0 || size <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }
    }
    function createData(version, errorCorrectionLevel, segments) {
      const buffer = new BitBuffer();
      segments.forEach(function(data) {
        buffer.put(data.mode.bit, 4);
        buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version));
        data.write(buffer);
      });
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
      if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
        buffer.put(0, 4);
      }
      while (buffer.getLengthInBits() % 8 !== 0) {
        buffer.putBit(0);
      }
      const remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;
      for (let i = 0; i < remainingByte; i++) {
        buffer.put(i % 2 ? 17 : 236, 8);
      }
      return createCodewords(buffer, version, errorCorrectionLevel);
    }
    function createCodewords(bitBuffer, version, errorCorrectionLevel) {
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewords = totalCodewords - ecTotalCodewords;
      const ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel);
      const blocksInGroup2 = totalCodewords % ecTotalBlocks;
      const blocksInGroup1 = ecTotalBlocks - blocksInGroup2;
      const totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);
      const dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
      const dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;
      const ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;
      const rs = new ReedSolomonEncoder(ecCount);
      let offset = 0;
      const dcData = new Array(ecTotalBlocks);
      const ecData = new Array(ecTotalBlocks);
      let maxDataSize = 0;
      const buffer = new Uint8Array(bitBuffer.buffer);
      for (let b = 0; b < ecTotalBlocks; b++) {
        const dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;
        dcData[b] = buffer.slice(offset, offset + dataSize);
        ecData[b] = rs.encode(dcData[b]);
        offset += dataSize;
        maxDataSize = Math.max(maxDataSize, dataSize);
      }
      const data = new Uint8Array(totalCodewords);
      let index = 0;
      let i, r;
      for (i = 0; i < maxDataSize; i++) {
        for (r = 0; r < ecTotalBlocks; r++) {
          if (i < dcData[r].length) {
            data[index++] = dcData[r][i];
          }
        }
      }
      for (i = 0; i < ecCount; i++) {
        for (r = 0; r < ecTotalBlocks; r++) {
          data[index++] = ecData[r][i];
        }
      }
      return data;
    }
    function createSymbol(data, version, errorCorrectionLevel, maskPattern) {
      let segments;
      if (Array.isArray(data)) {
        segments = Segments.fromArray(data);
      } else if (typeof data === "string") {
        let estimatedVersion = version;
        if (!estimatedVersion) {
          const rawSegments = Segments.rawSplit(data);
          estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel);
        }
        segments = Segments.fromString(data, estimatedVersion || 40);
      } else {
        throw new Error("Invalid data");
      }
      const bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel);
      if (!bestVersion) {
        throw new Error("The amount of data is too big to be stored in a QR Code");
      }
      if (!version) {
        version = bestVersion;
      } else if (version < bestVersion) {
        throw new Error(
          "\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " + bestVersion + ".\n"
        );
      }
      const dataBits = createData(version, errorCorrectionLevel, segments);
      const moduleCount = Utils.getSymbolSize(version);
      const modules = new BitMatrix(moduleCount);
      setupFinderPattern(modules, version);
      setupTimingPattern(modules);
      setupAlignmentPattern(modules, version);
      setupFormatInfo(modules, errorCorrectionLevel, 0);
      if (version >= 7) {
        setupVersionInfo(modules, version);
      }
      setupData(modules, dataBits);
      if (isNaN(maskPattern)) {
        maskPattern = MaskPattern.getBestMask(
          modules,
          setupFormatInfo.bind(null, modules, errorCorrectionLevel)
        );
      }
      MaskPattern.applyMask(maskPattern, modules);
      setupFormatInfo(modules, errorCorrectionLevel, maskPattern);
      return {
        modules,
        version,
        errorCorrectionLevel,
        maskPattern,
        segments
      };
    }
    exports2.create = function create(data, options) {
      if (typeof data === "undefined" || data === "") {
        throw new Error("No input text");
      }
      let errorCorrectionLevel = ECLevel.M;
      let version;
      let mask;
      if (typeof options !== "undefined") {
        errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
        version = Version.from(options.version);
        mask = MaskPattern.from(options.maskPattern);
        if (options.toSJISFunc) {
          Utils.setToSJISFunction(options.toSJISFunc);
        }
      }
      return createSymbol(data, version, errorCorrectionLevel, mask);
    };
  }
});

// node_modules/pngjs/lib/chunkstream.js
var require_chunkstream = __commonJS({
  "node_modules/pngjs/lib/chunkstream.js"(exports2, module2) {
    "use strict";
    var util = require("util");
    var Stream = require("stream");
    var ChunkStream = module2.exports = function() {
      Stream.call(this);
      this._buffers = [];
      this._buffered = 0;
      this._reads = [];
      this._paused = false;
      this._encoding = "utf8";
      this.writable = true;
    };
    util.inherits(ChunkStream, Stream);
    ChunkStream.prototype.read = function(length, callback) {
      this._reads.push({
        length: Math.abs(length),
        // if length < 0 then at most this length
        allowLess: length < 0,
        func: callback
      });
      process.nextTick(
        function() {
          this._process();
          if (this._paused && this._reads && this._reads.length > 0) {
            this._paused = false;
            this.emit("drain");
          }
        }.bind(this)
      );
    };
    ChunkStream.prototype.write = function(data, encoding) {
      if (!this.writable) {
        this.emit("error", new Error("Stream not writable"));
        return false;
      }
      let dataBuffer;
      if (Buffer.isBuffer(data)) {
        dataBuffer = data;
      } else {
        dataBuffer = Buffer.from(data, encoding || this._encoding);
      }
      this._buffers.push(dataBuffer);
      this._buffered += dataBuffer.length;
      this._process();
      if (this._reads && this._reads.length === 0) {
        this._paused = true;
      }
      return this.writable && !this._paused;
    };
    ChunkStream.prototype.end = function(data, encoding) {
      if (data) {
        this.write(data, encoding);
      }
      this.writable = false;
      if (!this._buffers) {
        return;
      }
      if (this._buffers.length === 0) {
        this._end();
      } else {
        this._buffers.push(null);
        this._process();
      }
    };
    ChunkStream.prototype.destroySoon = ChunkStream.prototype.end;
    ChunkStream.prototype._end = function() {
      if (this._reads.length > 0) {
        this.emit("error", new Error("Unexpected end of input"));
      }
      this.destroy();
    };
    ChunkStream.prototype.destroy = function() {
      if (!this._buffers) {
        return;
      }
      this.writable = false;
      this._reads = null;
      this._buffers = null;
      this.emit("close");
    };
    ChunkStream.prototype._processReadAllowingLess = function(read) {
      this._reads.shift();
      let smallerBuf = this._buffers[0];
      if (smallerBuf.length > read.length) {
        this._buffered -= read.length;
        this._buffers[0] = smallerBuf.slice(read.length);
        read.func.call(this, smallerBuf.slice(0, read.length));
      } else {
        this._buffered -= smallerBuf.length;
        this._buffers.shift();
        read.func.call(this, smallerBuf);
      }
    };
    ChunkStream.prototype._processRead = function(read) {
      this._reads.shift();
      let pos = 0;
      let count = 0;
      let data = Buffer.alloc(read.length);
      while (pos < read.length) {
        let buf = this._buffers[count++];
        let len = Math.min(buf.length, read.length - pos);
        buf.copy(data, pos, 0, len);
        pos += len;
        if (len !== buf.length) {
          this._buffers[--count] = buf.slice(len);
        }
      }
      if (count > 0) {
        this._buffers.splice(0, count);
      }
      this._buffered -= read.length;
      read.func.call(this, data);
    };
    ChunkStream.prototype._process = function() {
      try {
        while (this._buffered > 0 && this._reads && this._reads.length > 0) {
          let read = this._reads[0];
          if (read.allowLess) {
            this._processReadAllowingLess(read);
          } else if (this._buffered >= read.length) {
            this._processRead(read);
          } else {
            break;
          }
        }
        if (this._buffers && !this.writable) {
          this._end();
        }
      } catch (ex) {
        this.emit("error", ex);
      }
    };
  }
});

// node_modules/pngjs/lib/interlace.js
var require_interlace = __commonJS({
  "node_modules/pngjs/lib/interlace.js"(exports2) {
    "use strict";
    var imagePasses = [
      {
        // pass 1 - 1px
        x: [0],
        y: [0]
      },
      {
        // pass 2 - 1px
        x: [4],
        y: [0]
      },
      {
        // pass 3 - 2px
        x: [0, 4],
        y: [4]
      },
      {
        // pass 4 - 4px
        x: [2, 6],
        y: [0, 4]
      },
      {
        // pass 5 - 8px
        x: [0, 2, 4, 6],
        y: [2, 6]
      },
      {
        // pass 6 - 16px
        x: [1, 3, 5, 7],
        y: [0, 2, 4, 6]
      },
      {
        // pass 7 - 32px
        x: [0, 1, 2, 3, 4, 5, 6, 7],
        y: [1, 3, 5, 7]
      }
    ];
    exports2.getImagePasses = function(width, height) {
      let images = [];
      let xLeftOver = width % 8;
      let yLeftOver = height % 8;
      let xRepeats = (width - xLeftOver) / 8;
      let yRepeats = (height - yLeftOver) / 8;
      for (let i = 0; i < imagePasses.length; i++) {
        let pass = imagePasses[i];
        let passWidth = xRepeats * pass.x.length;
        let passHeight = yRepeats * pass.y.length;
        for (let j = 0; j < pass.x.length; j++) {
          if (pass.x[j] < xLeftOver) {
            passWidth++;
          } else {
            break;
          }
        }
        for (let j = 0; j < pass.y.length; j++) {
          if (pass.y[j] < yLeftOver) {
            passHeight++;
          } else {
            break;
          }
        }
        if (passWidth > 0 && passHeight > 0) {
          images.push({ width: passWidth, height: passHeight, index: i });
        }
      }
      return images;
    };
    exports2.getInterlaceIterator = function(width) {
      return function(x, y, pass) {
        let outerXLeftOver = x % imagePasses[pass].x.length;
        let outerX = (x - outerXLeftOver) / imagePasses[pass].x.length * 8 + imagePasses[pass].x[outerXLeftOver];
        let outerYLeftOver = y % imagePasses[pass].y.length;
        let outerY = (y - outerYLeftOver) / imagePasses[pass].y.length * 8 + imagePasses[pass].y[outerYLeftOver];
        return outerX * 4 + outerY * width * 4;
      };
    };
  }
});

// node_modules/pngjs/lib/paeth-predictor.js
var require_paeth_predictor = __commonJS({
  "node_modules/pngjs/lib/paeth-predictor.js"(exports2, module2) {
    "use strict";
    module2.exports = function paethPredictor(left, above, upLeft) {
      let paeth = left + above - upLeft;
      let pLeft = Math.abs(paeth - left);
      let pAbove = Math.abs(paeth - above);
      let pUpLeft = Math.abs(paeth - upLeft);
      if (pLeft <= pAbove && pLeft <= pUpLeft) {
        return left;
      }
      if (pAbove <= pUpLeft) {
        return above;
      }
      return upLeft;
    };
  }
});

// node_modules/pngjs/lib/filter-parse.js
var require_filter_parse = __commonJS({
  "node_modules/pngjs/lib/filter-parse.js"(exports2, module2) {
    "use strict";
    var interlaceUtils = require_interlace();
    var paethPredictor = require_paeth_predictor();
    function getByteWidth(width, bpp, depth) {
      let byteWidth = width * bpp;
      if (depth !== 8) {
        byteWidth = Math.ceil(byteWidth / (8 / depth));
      }
      return byteWidth;
    }
    var Filter = module2.exports = function(bitmapInfo, dependencies) {
      let width = bitmapInfo.width;
      let height = bitmapInfo.height;
      let interlace = bitmapInfo.interlace;
      let bpp = bitmapInfo.bpp;
      let depth = bitmapInfo.depth;
      this.read = dependencies.read;
      this.write = dependencies.write;
      this.complete = dependencies.complete;
      this._imageIndex = 0;
      this._images = [];
      if (interlace) {
        let passes = interlaceUtils.getImagePasses(width, height);
        for (let i = 0; i < passes.length; i++) {
          this._images.push({
            byteWidth: getByteWidth(passes[i].width, bpp, depth),
            height: passes[i].height,
            lineIndex: 0
          });
        }
      } else {
        this._images.push({
          byteWidth: getByteWidth(width, bpp, depth),
          height,
          lineIndex: 0
        });
      }
      if (depth === 8) {
        this._xComparison = bpp;
      } else if (depth === 16) {
        this._xComparison = bpp * 2;
      } else {
        this._xComparison = 1;
      }
    };
    Filter.prototype.start = function() {
      this.read(
        this._images[this._imageIndex].byteWidth + 1,
        this._reverseFilterLine.bind(this)
      );
    };
    Filter.prototype._unFilterType1 = function(rawData, unfilteredLine, byteWidth) {
      let xComparison = this._xComparison;
      let xBiggerThan = xComparison - 1;
      for (let x = 0; x < byteWidth; x++) {
        let rawByte = rawData[1 + x];
        let f1Left = x > xBiggerThan ? unfilteredLine[x - xComparison] : 0;
        unfilteredLine[x] = rawByte + f1Left;
      }
    };
    Filter.prototype._unFilterType2 = function(rawData, unfilteredLine, byteWidth) {
      let lastLine = this._lastLine;
      for (let x = 0; x < byteWidth; x++) {
        let rawByte = rawData[1 + x];
        let f2Up = lastLine ? lastLine[x] : 0;
        unfilteredLine[x] = rawByte + f2Up;
      }
    };
    Filter.prototype._unFilterType3 = function(rawData, unfilteredLine, byteWidth) {
      let xComparison = this._xComparison;
      let xBiggerThan = xComparison - 1;
      let lastLine = this._lastLine;
      for (let x = 0; x < byteWidth; x++) {
        let rawByte = rawData[1 + x];
        let f3Up = lastLine ? lastLine[x] : 0;
        let f3Left = x > xBiggerThan ? unfilteredLine[x - xComparison] : 0;
        let f3Add = Math.floor((f3Left + f3Up) / 2);
        unfilteredLine[x] = rawByte + f3Add;
      }
    };
    Filter.prototype._unFilterType4 = function(rawData, unfilteredLine, byteWidth) {
      let xComparison = this._xComparison;
      let xBiggerThan = xComparison - 1;
      let lastLine = this._lastLine;
      for (let x = 0; x < byteWidth; x++) {
        let rawByte = rawData[1 + x];
        let f4Up = lastLine ? lastLine[x] : 0;
        let f4Left = x > xBiggerThan ? unfilteredLine[x - xComparison] : 0;
        let f4UpLeft = x > xBiggerThan && lastLine ? lastLine[x - xComparison] : 0;
        let f4Add = paethPredictor(f4Left, f4Up, f4UpLeft);
        unfilteredLine[x] = rawByte + f4Add;
      }
    };
    Filter.prototype._reverseFilterLine = function(rawData) {
      let filter = rawData[0];
      let unfilteredLine;
      let currentImage = this._images[this._imageIndex];
      let byteWidth = currentImage.byteWidth;
      if (filter === 0) {
        unfilteredLine = rawData.slice(1, byteWidth + 1);
      } else {
        unfilteredLine = Buffer.alloc(byteWidth);
        switch (filter) {
          case 1:
            this._unFilterType1(rawData, unfilteredLine, byteWidth);
            break;
          case 2:
            this._unFilterType2(rawData, unfilteredLine, byteWidth);
            break;
          case 3:
            this._unFilterType3(rawData, unfilteredLine, byteWidth);
            break;
          case 4:
            this._unFilterType4(rawData, unfilteredLine, byteWidth);
            break;
          default:
            throw new Error("Unrecognised filter type - " + filter);
        }
      }
      this.write(unfilteredLine);
      currentImage.lineIndex++;
      if (currentImage.lineIndex >= currentImage.height) {
        this._lastLine = null;
        this._imageIndex++;
        currentImage = this._images[this._imageIndex];
      } else {
        this._lastLine = unfilteredLine;
      }
      if (currentImage) {
        this.read(currentImage.byteWidth + 1, this._reverseFilterLine.bind(this));
      } else {
        this._lastLine = null;
        this.complete();
      }
    };
  }
});

// node_modules/pngjs/lib/filter-parse-async.js
var require_filter_parse_async = __commonJS({
  "node_modules/pngjs/lib/filter-parse-async.js"(exports2, module2) {
    "use strict";
    var util = require("util");
    var ChunkStream = require_chunkstream();
    var Filter = require_filter_parse();
    var FilterAsync = module2.exports = function(bitmapInfo) {
      ChunkStream.call(this);
      let buffers = [];
      let that = this;
      this._filter = new Filter(bitmapInfo, {
        read: this.read.bind(this),
        write: function(buffer) {
          buffers.push(buffer);
        },
        complete: function() {
          that.emit("complete", Buffer.concat(buffers));
        }
      });
      this._filter.start();
    };
    util.inherits(FilterAsync, ChunkStream);
  }
});

// node_modules/pngjs/lib/constants.js
var require_constants = __commonJS({
  "node_modules/pngjs/lib/constants.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      PNG_SIGNATURE: [137, 80, 78, 71, 13, 10, 26, 10],
      TYPE_IHDR: 1229472850,
      TYPE_IEND: 1229278788,
      TYPE_IDAT: 1229209940,
      TYPE_PLTE: 1347179589,
      TYPE_tRNS: 1951551059,
      // eslint-disable-line camelcase
      TYPE_gAMA: 1732332865,
      // eslint-disable-line camelcase
      // color-type bits
      COLORTYPE_GRAYSCALE: 0,
      COLORTYPE_PALETTE: 1,
      COLORTYPE_COLOR: 2,
      COLORTYPE_ALPHA: 4,
      // e.g. grayscale and alpha
      // color-type combinations
      COLORTYPE_PALETTE_COLOR: 3,
      COLORTYPE_COLOR_ALPHA: 6,
      COLORTYPE_TO_BPP_MAP: {
        0: 1,
        2: 3,
        3: 1,
        4: 2,
        6: 4
      },
      GAMMA_DIVISION: 1e5
    };
  }
});

// node_modules/pngjs/lib/crc.js
var require_crc = __commonJS({
  "node_modules/pngjs/lib/crc.js"(exports2, module2) {
    "use strict";
    var crcTable = [];
    (function() {
      for (let i = 0; i < 256; i++) {
        let currentCrc = i;
        for (let j = 0; j < 8; j++) {
          if (currentCrc & 1) {
            currentCrc = 3988292384 ^ currentCrc >>> 1;
          } else {
            currentCrc = currentCrc >>> 1;
          }
        }
        crcTable[i] = currentCrc;
      }
    })();
    var CrcCalculator = module2.exports = function() {
      this._crc = -1;
    };
    CrcCalculator.prototype.write = function(data) {
      for (let i = 0; i < data.length; i++) {
        this._crc = crcTable[(this._crc ^ data[i]) & 255] ^ this._crc >>> 8;
      }
      return true;
    };
    CrcCalculator.prototype.crc32 = function() {
      return this._crc ^ -1;
    };
    CrcCalculator.crc32 = function(buf) {
      let crc = -1;
      for (let i = 0; i < buf.length; i++) {
        crc = crcTable[(crc ^ buf[i]) & 255] ^ crc >>> 8;
      }
      return crc ^ -1;
    };
  }
});

// node_modules/pngjs/lib/parser.js
var require_parser = __commonJS({
  "node_modules/pngjs/lib/parser.js"(exports2, module2) {
    "use strict";
    var constants = require_constants();
    var CrcCalculator = require_crc();
    var Parser = module2.exports = function(options, dependencies) {
      this._options = options;
      options.checkCRC = options.checkCRC !== false;
      this._hasIHDR = false;
      this._hasIEND = false;
      this._emittedHeadersFinished = false;
      this._palette = [];
      this._colorType = 0;
      this._chunks = {};
      this._chunks[constants.TYPE_IHDR] = this._handleIHDR.bind(this);
      this._chunks[constants.TYPE_IEND] = this._handleIEND.bind(this);
      this._chunks[constants.TYPE_IDAT] = this._handleIDAT.bind(this);
      this._chunks[constants.TYPE_PLTE] = this._handlePLTE.bind(this);
      this._chunks[constants.TYPE_tRNS] = this._handleTRNS.bind(this);
      this._chunks[constants.TYPE_gAMA] = this._handleGAMA.bind(this);
      this.read = dependencies.read;
      this.error = dependencies.error;
      this.metadata = dependencies.metadata;
      this.gamma = dependencies.gamma;
      this.transColor = dependencies.transColor;
      this.palette = dependencies.palette;
      this.parsed = dependencies.parsed;
      this.inflateData = dependencies.inflateData;
      this.finished = dependencies.finished;
      this.simpleTransparency = dependencies.simpleTransparency;
      this.headersFinished = dependencies.headersFinished || function() {
      };
    };
    Parser.prototype.start = function() {
      this.read(constants.PNG_SIGNATURE.length, this._parseSignature.bind(this));
    };
    Parser.prototype._parseSignature = function(data) {
      let signature = constants.PNG_SIGNATURE;
      for (let i = 0; i < signature.length; i++) {
        if (data[i] !== signature[i]) {
          this.error(new Error("Invalid file signature"));
          return;
        }
      }
      this.read(8, this._parseChunkBegin.bind(this));
    };
    Parser.prototype._parseChunkBegin = function(data) {
      let length = data.readUInt32BE(0);
      let type = data.readUInt32BE(4);
      let name = "";
      for (let i = 4; i < 8; i++) {
        name += String.fromCharCode(data[i]);
      }
      let ancillary = Boolean(data[4] & 32);
      if (!this._hasIHDR && type !== constants.TYPE_IHDR) {
        this.error(new Error("Expected IHDR on beggining"));
        return;
      }
      this._crc = new CrcCalculator();
      this._crc.write(Buffer.from(name));
      if (this._chunks[type]) {
        return this._chunks[type](length);
      }
      if (!ancillary) {
        this.error(new Error("Unsupported critical chunk type " + name));
        return;
      }
      this.read(length + 4, this._skipChunk.bind(this));
    };
    Parser.prototype._skipChunk = function() {
      this.read(8, this._parseChunkBegin.bind(this));
    };
    Parser.prototype._handleChunkEnd = function() {
      this.read(4, this._parseChunkEnd.bind(this));
    };
    Parser.prototype._parseChunkEnd = function(data) {
      let fileCrc = data.readInt32BE(0);
      let calcCrc = this._crc.crc32();
      if (this._options.checkCRC && calcCrc !== fileCrc) {
        this.error(new Error("Crc error - " + fileCrc + " - " + calcCrc));
        return;
      }
      if (!this._hasIEND) {
        this.read(8, this._parseChunkBegin.bind(this));
      }
    };
    Parser.prototype._handleIHDR = function(length) {
      this.read(length, this._parseIHDR.bind(this));
    };
    Parser.prototype._parseIHDR = function(data) {
      this._crc.write(data);
      let width = data.readUInt32BE(0);
      let height = data.readUInt32BE(4);
      let depth = data[8];
      let colorType = data[9];
      let compr = data[10];
      let filter = data[11];
      let interlace = data[12];
      if (depth !== 8 && depth !== 4 && depth !== 2 && depth !== 1 && depth !== 16) {
        this.error(new Error("Unsupported bit depth " + depth));
        return;
      }
      if (!(colorType in constants.COLORTYPE_TO_BPP_MAP)) {
        this.error(new Error("Unsupported color type"));
        return;
      }
      if (compr !== 0) {
        this.error(new Error("Unsupported compression method"));
        return;
      }
      if (filter !== 0) {
        this.error(new Error("Unsupported filter method"));
        return;
      }
      if (interlace !== 0 && interlace !== 1) {
        this.error(new Error("Unsupported interlace method"));
        return;
      }
      this._colorType = colorType;
      let bpp = constants.COLORTYPE_TO_BPP_MAP[this._colorType];
      this._hasIHDR = true;
      this.metadata({
        width,
        height,
        depth,
        interlace: Boolean(interlace),
        palette: Boolean(colorType & constants.COLORTYPE_PALETTE),
        color: Boolean(colorType & constants.COLORTYPE_COLOR),
        alpha: Boolean(colorType & constants.COLORTYPE_ALPHA),
        bpp,
        colorType
      });
      this._handleChunkEnd();
    };
    Parser.prototype._handlePLTE = function(length) {
      this.read(length, this._parsePLTE.bind(this));
    };
    Parser.prototype._parsePLTE = function(data) {
      this._crc.write(data);
      let entries = Math.floor(data.length / 3);
      for (let i = 0; i < entries; i++) {
        this._palette.push([data[i * 3], data[i * 3 + 1], data[i * 3 + 2], 255]);
      }
      this.palette(this._palette);
      this._handleChunkEnd();
    };
    Parser.prototype._handleTRNS = function(length) {
      this.simpleTransparency();
      this.read(length, this._parseTRNS.bind(this));
    };
    Parser.prototype._parseTRNS = function(data) {
      this._crc.write(data);
      if (this._colorType === constants.COLORTYPE_PALETTE_COLOR) {
        if (this._palette.length === 0) {
          this.error(new Error("Transparency chunk must be after palette"));
          return;
        }
        if (data.length > this._palette.length) {
          this.error(new Error("More transparent colors than palette size"));
          return;
        }
        for (let i = 0; i < data.length; i++) {
          this._palette[i][3] = data[i];
        }
        this.palette(this._palette);
      }
      if (this._colorType === constants.COLORTYPE_GRAYSCALE) {
        this.transColor([data.readUInt16BE(0)]);
      }
      if (this._colorType === constants.COLORTYPE_COLOR) {
        this.transColor([
          data.readUInt16BE(0),
          data.readUInt16BE(2),
          data.readUInt16BE(4)
        ]);
      }
      this._handleChunkEnd();
    };
    Parser.prototype._handleGAMA = function(length) {
      this.read(length, this._parseGAMA.bind(this));
    };
    Parser.prototype._parseGAMA = function(data) {
      this._crc.write(data);
      this.gamma(data.readUInt32BE(0) / constants.GAMMA_DIVISION);
      this._handleChunkEnd();
    };
    Parser.prototype._handleIDAT = function(length) {
      if (!this._emittedHeadersFinished) {
        this._emittedHeadersFinished = true;
        this.headersFinished();
      }
      this.read(-length, this._parseIDAT.bind(this, length));
    };
    Parser.prototype._parseIDAT = function(length, data) {
      this._crc.write(data);
      if (this._colorType === constants.COLORTYPE_PALETTE_COLOR && this._palette.length === 0) {
        throw new Error("Expected palette not found");
      }
      this.inflateData(data);
      let leftOverLength = length - data.length;
      if (leftOverLength > 0) {
        this._handleIDAT(leftOverLength);
      } else {
        this._handleChunkEnd();
      }
    };
    Parser.prototype._handleIEND = function(length) {
      this.read(length, this._parseIEND.bind(this));
    };
    Parser.prototype._parseIEND = function(data) {
      this._crc.write(data);
      this._hasIEND = true;
      this._handleChunkEnd();
      if (this.finished) {
        this.finished();
      }
    };
  }
});

// node_modules/pngjs/lib/bitmapper.js
var require_bitmapper = __commonJS({
  "node_modules/pngjs/lib/bitmapper.js"(exports2) {
    "use strict";
    var interlaceUtils = require_interlace();
    var pixelBppMapper = [
      // 0 - dummy entry
      function() {
      },
      // 1 - L
      // 0: 0, 1: 0, 2: 0, 3: 0xff
      function(pxData, data, pxPos, rawPos) {
        if (rawPos === data.length) {
          throw new Error("Ran out of data");
        }
        let pixel = data[rawPos];
        pxData[pxPos] = pixel;
        pxData[pxPos + 1] = pixel;
        pxData[pxPos + 2] = pixel;
        pxData[pxPos + 3] = 255;
      },
      // 2 - LA
      // 0: 0, 1: 0, 2: 0, 3: 1
      function(pxData, data, pxPos, rawPos) {
        if (rawPos + 1 >= data.length) {
          throw new Error("Ran out of data");
        }
        let pixel = data[rawPos];
        pxData[pxPos] = pixel;
        pxData[pxPos + 1] = pixel;
        pxData[pxPos + 2] = pixel;
        pxData[pxPos + 3] = data[rawPos + 1];
      },
      // 3 - RGB
      // 0: 0, 1: 1, 2: 2, 3: 0xff
      function(pxData, data, pxPos, rawPos) {
        if (rawPos + 2 >= data.length) {
          throw new Error("Ran out of data");
        }
        pxData[pxPos] = data[rawPos];
        pxData[pxPos + 1] = data[rawPos + 1];
        pxData[pxPos + 2] = data[rawPos + 2];
        pxData[pxPos + 3] = 255;
      },
      // 4 - RGBA
      // 0: 0, 1: 1, 2: 2, 3: 3
      function(pxData, data, pxPos, rawPos) {
        if (rawPos + 3 >= data.length) {
          throw new Error("Ran out of data");
        }
        pxData[pxPos] = data[rawPos];
        pxData[pxPos + 1] = data[rawPos + 1];
        pxData[pxPos + 2] = data[rawPos + 2];
        pxData[pxPos + 3] = data[rawPos + 3];
      }
    ];
    var pixelBppCustomMapper = [
      // 0 - dummy entry
      function() {
      },
      // 1 - L
      // 0: 0, 1: 0, 2: 0, 3: 0xff
      function(pxData, pixelData, pxPos, maxBit) {
        let pixel = pixelData[0];
        pxData[pxPos] = pixel;
        pxData[pxPos + 1] = pixel;
        pxData[pxPos + 2] = pixel;
        pxData[pxPos + 3] = maxBit;
      },
      // 2 - LA
      // 0: 0, 1: 0, 2: 0, 3: 1
      function(pxData, pixelData, pxPos) {
        let pixel = pixelData[0];
        pxData[pxPos] = pixel;
        pxData[pxPos + 1] = pixel;
        pxData[pxPos + 2] = pixel;
        pxData[pxPos + 3] = pixelData[1];
      },
      // 3 - RGB
      // 0: 0, 1: 1, 2: 2, 3: 0xff
      function(pxData, pixelData, pxPos, maxBit) {
        pxData[pxPos] = pixelData[0];
        pxData[pxPos + 1] = pixelData[1];
        pxData[pxPos + 2] = pixelData[2];
        pxData[pxPos + 3] = maxBit;
      },
      // 4 - RGBA
      // 0: 0, 1: 1, 2: 2, 3: 3
      function(pxData, pixelData, pxPos) {
        pxData[pxPos] = pixelData[0];
        pxData[pxPos + 1] = pixelData[1];
        pxData[pxPos + 2] = pixelData[2];
        pxData[pxPos + 3] = pixelData[3];
      }
    ];
    function bitRetriever(data, depth) {
      let leftOver = [];
      let i = 0;
      function split() {
        if (i === data.length) {
          throw new Error("Ran out of data");
        }
        let byte = data[i];
        i++;
        let byte8, byte7, byte6, byte5, byte4, byte3, byte2, byte1;
        switch (depth) {
          default:
            throw new Error("unrecognised depth");
          case 16:
            byte2 = data[i];
            i++;
            leftOver.push((byte << 8) + byte2);
            break;
          case 4:
            byte2 = byte & 15;
            byte1 = byte >> 4;
            leftOver.push(byte1, byte2);
            break;
          case 2:
            byte4 = byte & 3;
            byte3 = byte >> 2 & 3;
            byte2 = byte >> 4 & 3;
            byte1 = byte >> 6 & 3;
            leftOver.push(byte1, byte2, byte3, byte4);
            break;
          case 1:
            byte8 = byte & 1;
            byte7 = byte >> 1 & 1;
            byte6 = byte >> 2 & 1;
            byte5 = byte >> 3 & 1;
            byte4 = byte >> 4 & 1;
            byte3 = byte >> 5 & 1;
            byte2 = byte >> 6 & 1;
            byte1 = byte >> 7 & 1;
            leftOver.push(byte1, byte2, byte3, byte4, byte5, byte6, byte7, byte8);
            break;
        }
      }
      return {
        get: function(count) {
          while (leftOver.length < count) {
            split();
          }
          let returner = leftOver.slice(0, count);
          leftOver = leftOver.slice(count);
          return returner;
        },
        resetAfterLine: function() {
          leftOver.length = 0;
        },
        end: function() {
          if (i !== data.length) {
            throw new Error("extra data found");
          }
        }
      };
    }
    function mapImage8Bit(image, pxData, getPxPos, bpp, data, rawPos) {
      let imageWidth = image.width;
      let imageHeight = image.height;
      let imagePass = image.index;
      for (let y = 0; y < imageHeight; y++) {
        for (let x = 0; x < imageWidth; x++) {
          let pxPos = getPxPos(x, y, imagePass);
          pixelBppMapper[bpp](pxData, data, pxPos, rawPos);
          rawPos += bpp;
        }
      }
      return rawPos;
    }
    function mapImageCustomBit(image, pxData, getPxPos, bpp, bits, maxBit) {
      let imageWidth = image.width;
      let imageHeight = image.height;
      let imagePass = image.index;
      for (let y = 0; y < imageHeight; y++) {
        for (let x = 0; x < imageWidth; x++) {
          let pixelData = bits.get(bpp);
          let pxPos = getPxPos(x, y, imagePass);
          pixelBppCustomMapper[bpp](pxData, pixelData, pxPos, maxBit);
        }
        bits.resetAfterLine();
      }
    }
    exports2.dataToBitMap = function(data, bitmapInfo) {
      let width = bitmapInfo.width;
      let height = bitmapInfo.height;
      let depth = bitmapInfo.depth;
      let bpp = bitmapInfo.bpp;
      let interlace = bitmapInfo.interlace;
      let bits;
      if (depth !== 8) {
        bits = bitRetriever(data, depth);
      }
      let pxData;
      if (depth <= 8) {
        pxData = Buffer.alloc(width * height * 4);
      } else {
        pxData = new Uint16Array(width * height * 4);
      }
      let maxBit = Math.pow(2, depth) - 1;
      let rawPos = 0;
      let images;
      let getPxPos;
      if (interlace) {
        images = interlaceUtils.getImagePasses(width, height);
        getPxPos = interlaceUtils.getInterlaceIterator(width, height);
      } else {
        let nonInterlacedPxPos = 0;
        getPxPos = function() {
          let returner = nonInterlacedPxPos;
          nonInterlacedPxPos += 4;
          return returner;
        };
        images = [{ width, height }];
      }
      for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
        if (depth === 8) {
          rawPos = mapImage8Bit(
            images[imageIndex],
            pxData,
            getPxPos,
            bpp,
            data,
            rawPos
          );
        } else {
          mapImageCustomBit(
            images[imageIndex],
            pxData,
            getPxPos,
            bpp,
            bits,
            maxBit
          );
        }
      }
      if (depth === 8) {
        if (rawPos !== data.length) {
          throw new Error("extra data found");
        }
      } else {
        bits.end();
      }
      return pxData;
    };
  }
});

// node_modules/pngjs/lib/format-normaliser.js
var require_format_normaliser = __commonJS({
  "node_modules/pngjs/lib/format-normaliser.js"(exports2, module2) {
    "use strict";
    function dePalette(indata, outdata, width, height, palette) {
      let pxPos = 0;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          let color = palette[indata[pxPos]];
          if (!color) {
            throw new Error("index " + indata[pxPos] + " not in palette");
          }
          for (let i = 0; i < 4; i++) {
            outdata[pxPos + i] = color[i];
          }
          pxPos += 4;
        }
      }
    }
    function replaceTransparentColor(indata, outdata, width, height, transColor) {
      let pxPos = 0;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          let makeTrans = false;
          if (transColor.length === 1) {
            if (transColor[0] === indata[pxPos]) {
              makeTrans = true;
            }
          } else if (transColor[0] === indata[pxPos] && transColor[1] === indata[pxPos + 1] && transColor[2] === indata[pxPos + 2]) {
            makeTrans = true;
          }
          if (makeTrans) {
            for (let i = 0; i < 4; i++) {
              outdata[pxPos + i] = 0;
            }
          }
          pxPos += 4;
        }
      }
    }
    function scaleDepth(indata, outdata, width, height, depth) {
      let maxOutSample = 255;
      let maxInSample = Math.pow(2, depth) - 1;
      let pxPos = 0;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          for (let i = 0; i < 4; i++) {
            outdata[pxPos + i] = Math.floor(
              indata[pxPos + i] * maxOutSample / maxInSample + 0.5
            );
          }
          pxPos += 4;
        }
      }
    }
    module2.exports = function(indata, imageData) {
      let depth = imageData.depth;
      let width = imageData.width;
      let height = imageData.height;
      let colorType = imageData.colorType;
      let transColor = imageData.transColor;
      let palette = imageData.palette;
      let outdata = indata;
      if (colorType === 3) {
        dePalette(indata, outdata, width, height, palette);
      } else {
        if (transColor) {
          replaceTransparentColor(indata, outdata, width, height, transColor);
        }
        if (depth !== 8) {
          if (depth === 16) {
            outdata = Buffer.alloc(width * height * 4);
          }
          scaleDepth(indata, outdata, width, height, depth);
        }
      }
      return outdata;
    };
  }
});

// node_modules/pngjs/lib/parser-async.js
var require_parser_async = __commonJS({
  "node_modules/pngjs/lib/parser-async.js"(exports2, module2) {
    "use strict";
    var util = require("util");
    var zlib = require("zlib");
    var ChunkStream = require_chunkstream();
    var FilterAsync = require_filter_parse_async();
    var Parser = require_parser();
    var bitmapper = require_bitmapper();
    var formatNormaliser = require_format_normaliser();
    var ParserAsync = module2.exports = function(options) {
      ChunkStream.call(this);
      this._parser = new Parser(options, {
        read: this.read.bind(this),
        error: this._handleError.bind(this),
        metadata: this._handleMetaData.bind(this),
        gamma: this.emit.bind(this, "gamma"),
        palette: this._handlePalette.bind(this),
        transColor: this._handleTransColor.bind(this),
        finished: this._finished.bind(this),
        inflateData: this._inflateData.bind(this),
        simpleTransparency: this._simpleTransparency.bind(this),
        headersFinished: this._headersFinished.bind(this)
      });
      this._options = options;
      this.writable = true;
      this._parser.start();
    };
    util.inherits(ParserAsync, ChunkStream);
    ParserAsync.prototype._handleError = function(err) {
      this.emit("error", err);
      this.writable = false;
      this.destroy();
      if (this._inflate && this._inflate.destroy) {
        this._inflate.destroy();
      }
      if (this._filter) {
        this._filter.destroy();
        this._filter.on("error", function() {
        });
      }
      this.errord = true;
    };
    ParserAsync.prototype._inflateData = function(data) {
      if (!this._inflate) {
        if (this._bitmapInfo.interlace) {
          this._inflate = zlib.createInflate();
          this._inflate.on("error", this.emit.bind(this, "error"));
          this._filter.on("complete", this._complete.bind(this));
          this._inflate.pipe(this._filter);
        } else {
          let rowSize = (this._bitmapInfo.width * this._bitmapInfo.bpp * this._bitmapInfo.depth + 7 >> 3) + 1;
          let imageSize = rowSize * this._bitmapInfo.height;
          let chunkSize = Math.max(imageSize, zlib.Z_MIN_CHUNK);
          this._inflate = zlib.createInflate({ chunkSize });
          let leftToInflate = imageSize;
          let emitError = this.emit.bind(this, "error");
          this._inflate.on("error", function(err) {
            if (!leftToInflate) {
              return;
            }
            emitError(err);
          });
          this._filter.on("complete", this._complete.bind(this));
          let filterWrite = this._filter.write.bind(this._filter);
          this._inflate.on("data", function(chunk) {
            if (!leftToInflate) {
              return;
            }
            if (chunk.length > leftToInflate) {
              chunk = chunk.slice(0, leftToInflate);
            }
            leftToInflate -= chunk.length;
            filterWrite(chunk);
          });
          this._inflate.on("end", this._filter.end.bind(this._filter));
        }
      }
      this._inflate.write(data);
    };
    ParserAsync.prototype._handleMetaData = function(metaData) {
      this._metaData = metaData;
      this._bitmapInfo = Object.create(metaData);
      this._filter = new FilterAsync(this._bitmapInfo);
    };
    ParserAsync.prototype._handleTransColor = function(transColor) {
      this._bitmapInfo.transColor = transColor;
    };
    ParserAsync.prototype._handlePalette = function(palette) {
      this._bitmapInfo.palette = palette;
    };
    ParserAsync.prototype._simpleTransparency = function() {
      this._metaData.alpha = true;
    };
    ParserAsync.prototype._headersFinished = function() {
      this.emit("metadata", this._metaData);
    };
    ParserAsync.prototype._finished = function() {
      if (this.errord) {
        return;
      }
      if (!this._inflate) {
        this.emit("error", "No Inflate block");
      } else {
        this._inflate.end();
      }
    };
    ParserAsync.prototype._complete = function(filteredData) {
      if (this.errord) {
        return;
      }
      let normalisedBitmapData;
      try {
        let bitmapData = bitmapper.dataToBitMap(filteredData, this._bitmapInfo);
        normalisedBitmapData = formatNormaliser(bitmapData, this._bitmapInfo);
        bitmapData = null;
      } catch (ex) {
        this._handleError(ex);
        return;
      }
      this.emit("parsed", normalisedBitmapData);
    };
  }
});

// node_modules/pngjs/lib/bitpacker.js
var require_bitpacker = __commonJS({
  "node_modules/pngjs/lib/bitpacker.js"(exports2, module2) {
    "use strict";
    var constants = require_constants();
    module2.exports = function(dataIn, width, height, options) {
      let outHasAlpha = [constants.COLORTYPE_COLOR_ALPHA, constants.COLORTYPE_ALPHA].indexOf(
        options.colorType
      ) !== -1;
      if (options.colorType === options.inputColorType) {
        let bigEndian = (function() {
          let buffer = new ArrayBuffer(2);
          new DataView(buffer).setInt16(
            0,
            256,
            true
            /* littleEndian */
          );
          return new Int16Array(buffer)[0] !== 256;
        })();
        if (options.bitDepth === 8 || options.bitDepth === 16 && bigEndian) {
          return dataIn;
        }
      }
      let data = options.bitDepth !== 16 ? dataIn : new Uint16Array(dataIn.buffer);
      let maxValue = 255;
      let inBpp = constants.COLORTYPE_TO_BPP_MAP[options.inputColorType];
      if (inBpp === 4 && !options.inputHasAlpha) {
        inBpp = 3;
      }
      let outBpp = constants.COLORTYPE_TO_BPP_MAP[options.colorType];
      if (options.bitDepth === 16) {
        maxValue = 65535;
        outBpp *= 2;
      }
      let outData = Buffer.alloc(width * height * outBpp);
      let inIndex = 0;
      let outIndex = 0;
      let bgColor = options.bgColor || {};
      if (bgColor.red === void 0) {
        bgColor.red = maxValue;
      }
      if (bgColor.green === void 0) {
        bgColor.green = maxValue;
      }
      if (bgColor.blue === void 0) {
        bgColor.blue = maxValue;
      }
      function getRGBA() {
        let red;
        let green;
        let blue;
        let alpha = maxValue;
        switch (options.inputColorType) {
          case constants.COLORTYPE_COLOR_ALPHA:
            alpha = data[inIndex + 3];
            red = data[inIndex];
            green = data[inIndex + 1];
            blue = data[inIndex + 2];
            break;
          case constants.COLORTYPE_COLOR:
            red = data[inIndex];
            green = data[inIndex + 1];
            blue = data[inIndex + 2];
            break;
          case constants.COLORTYPE_ALPHA:
            alpha = data[inIndex + 1];
            red = data[inIndex];
            green = red;
            blue = red;
            break;
          case constants.COLORTYPE_GRAYSCALE:
            red = data[inIndex];
            green = red;
            blue = red;
            break;
          default:
            throw new Error(
              "input color type:" + options.inputColorType + " is not supported at present"
            );
        }
        if (options.inputHasAlpha) {
          if (!outHasAlpha) {
            alpha /= maxValue;
            red = Math.min(
              Math.max(Math.round((1 - alpha) * bgColor.red + alpha * red), 0),
              maxValue
            );
            green = Math.min(
              Math.max(Math.round((1 - alpha) * bgColor.green + alpha * green), 0),
              maxValue
            );
            blue = Math.min(
              Math.max(Math.round((1 - alpha) * bgColor.blue + alpha * blue), 0),
              maxValue
            );
          }
        }
        return { red, green, blue, alpha };
      }
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          let rgba = getRGBA(data, inIndex);
          switch (options.colorType) {
            case constants.COLORTYPE_COLOR_ALPHA:
            case constants.COLORTYPE_COLOR:
              if (options.bitDepth === 8) {
                outData[outIndex] = rgba.red;
                outData[outIndex + 1] = rgba.green;
                outData[outIndex + 2] = rgba.blue;
                if (outHasAlpha) {
                  outData[outIndex + 3] = rgba.alpha;
                }
              } else {
                outData.writeUInt16BE(rgba.red, outIndex);
                outData.writeUInt16BE(rgba.green, outIndex + 2);
                outData.writeUInt16BE(rgba.blue, outIndex + 4);
                if (outHasAlpha) {
                  outData.writeUInt16BE(rgba.alpha, outIndex + 6);
                }
              }
              break;
            case constants.COLORTYPE_ALPHA:
            case constants.COLORTYPE_GRAYSCALE: {
              let grayscale = (rgba.red + rgba.green + rgba.blue) / 3;
              if (options.bitDepth === 8) {
                outData[outIndex] = grayscale;
                if (outHasAlpha) {
                  outData[outIndex + 1] = rgba.alpha;
                }
              } else {
                outData.writeUInt16BE(grayscale, outIndex);
                if (outHasAlpha) {
                  outData.writeUInt16BE(rgba.alpha, outIndex + 2);
                }
              }
              break;
            }
            default:
              throw new Error("unrecognised color Type " + options.colorType);
          }
          inIndex += inBpp;
          outIndex += outBpp;
        }
      }
      return outData;
    };
  }
});

// node_modules/pngjs/lib/filter-pack.js
var require_filter_pack = __commonJS({
  "node_modules/pngjs/lib/filter-pack.js"(exports2, module2) {
    "use strict";
    var paethPredictor = require_paeth_predictor();
    function filterNone(pxData, pxPos, byteWidth, rawData, rawPos) {
      for (let x = 0; x < byteWidth; x++) {
        rawData[rawPos + x] = pxData[pxPos + x];
      }
    }
    function filterSumNone(pxData, pxPos, byteWidth) {
      let sum = 0;
      let length = pxPos + byteWidth;
      for (let i = pxPos; i < length; i++) {
        sum += Math.abs(pxData[i]);
      }
      return sum;
    }
    function filterSub(pxData, pxPos, byteWidth, rawData, rawPos, bpp) {
      for (let x = 0; x < byteWidth; x++) {
        let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        let val = pxData[pxPos + x] - left;
        rawData[rawPos + x] = val;
      }
    }
    function filterSumSub(pxData, pxPos, byteWidth, bpp) {
      let sum = 0;
      for (let x = 0; x < byteWidth; x++) {
        let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        let val = pxData[pxPos + x] - left;
        sum += Math.abs(val);
      }
      return sum;
    }
    function filterUp(pxData, pxPos, byteWidth, rawData, rawPos) {
      for (let x = 0; x < byteWidth; x++) {
        let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
        let val = pxData[pxPos + x] - up;
        rawData[rawPos + x] = val;
      }
    }
    function filterSumUp(pxData, pxPos, byteWidth) {
      let sum = 0;
      let length = pxPos + byteWidth;
      for (let x = pxPos; x < length; x++) {
        let up = pxPos > 0 ? pxData[x - byteWidth] : 0;
        let val = pxData[x] - up;
        sum += Math.abs(val);
      }
      return sum;
    }
    function filterAvg(pxData, pxPos, byteWidth, rawData, rawPos, bpp) {
      for (let x = 0; x < byteWidth; x++) {
        let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
        let val = pxData[pxPos + x] - (left + up >> 1);
        rawData[rawPos + x] = val;
      }
    }
    function filterSumAvg(pxData, pxPos, byteWidth, bpp) {
      let sum = 0;
      for (let x = 0; x < byteWidth; x++) {
        let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
        let val = pxData[pxPos + x] - (left + up >> 1);
        sum += Math.abs(val);
      }
      return sum;
    }
    function filterPaeth(pxData, pxPos, byteWidth, rawData, rawPos, bpp) {
      for (let x = 0; x < byteWidth; x++) {
        let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
        let upleft = pxPos > 0 && x >= bpp ? pxData[pxPos + x - (byteWidth + bpp)] : 0;
        let val = pxData[pxPos + x] - paethPredictor(left, up, upleft);
        rawData[rawPos + x] = val;
      }
    }
    function filterSumPaeth(pxData, pxPos, byteWidth, bpp) {
      let sum = 0;
      for (let x = 0; x < byteWidth; x++) {
        let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
        let upleft = pxPos > 0 && x >= bpp ? pxData[pxPos + x - (byteWidth + bpp)] : 0;
        let val = pxData[pxPos + x] - paethPredictor(left, up, upleft);
        sum += Math.abs(val);
      }
      return sum;
    }
    var filters = {
      0: filterNone,
      1: filterSub,
      2: filterUp,
      3: filterAvg,
      4: filterPaeth
    };
    var filterSums = {
      0: filterSumNone,
      1: filterSumSub,
      2: filterSumUp,
      3: filterSumAvg,
      4: filterSumPaeth
    };
    module2.exports = function(pxData, width, height, options, bpp) {
      let filterTypes;
      if (!("filterType" in options) || options.filterType === -1) {
        filterTypes = [0, 1, 2, 3, 4];
      } else if (typeof options.filterType === "number") {
        filterTypes = [options.filterType];
      } else {
        throw new Error("unrecognised filter types");
      }
      if (options.bitDepth === 16) {
        bpp *= 2;
      }
      let byteWidth = width * bpp;
      let rawPos = 0;
      let pxPos = 0;
      let rawData = Buffer.alloc((byteWidth + 1) * height);
      let sel = filterTypes[0];
      for (let y = 0; y < height; y++) {
        if (filterTypes.length > 1) {
          let min = Infinity;
          for (let i = 0; i < filterTypes.length; i++) {
            let sum = filterSums[filterTypes[i]](pxData, pxPos, byteWidth, bpp);
            if (sum < min) {
              sel = filterTypes[i];
              min = sum;
            }
          }
        }
        rawData[rawPos] = sel;
        rawPos++;
        filters[sel](pxData, pxPos, byteWidth, rawData, rawPos, bpp);
        rawPos += byteWidth;
        pxPos += byteWidth;
      }
      return rawData;
    };
  }
});

// node_modules/pngjs/lib/packer.js
var require_packer = __commonJS({
  "node_modules/pngjs/lib/packer.js"(exports2, module2) {
    "use strict";
    var constants = require_constants();
    var CrcStream = require_crc();
    var bitPacker = require_bitpacker();
    var filter = require_filter_pack();
    var zlib = require("zlib");
    var Packer = module2.exports = function(options) {
      this._options = options;
      options.deflateChunkSize = options.deflateChunkSize || 32 * 1024;
      options.deflateLevel = options.deflateLevel != null ? options.deflateLevel : 9;
      options.deflateStrategy = options.deflateStrategy != null ? options.deflateStrategy : 3;
      options.inputHasAlpha = options.inputHasAlpha != null ? options.inputHasAlpha : true;
      options.deflateFactory = options.deflateFactory || zlib.createDeflate;
      options.bitDepth = options.bitDepth || 8;
      options.colorType = typeof options.colorType === "number" ? options.colorType : constants.COLORTYPE_COLOR_ALPHA;
      options.inputColorType = typeof options.inputColorType === "number" ? options.inputColorType : constants.COLORTYPE_COLOR_ALPHA;
      if ([
        constants.COLORTYPE_GRAYSCALE,
        constants.COLORTYPE_COLOR,
        constants.COLORTYPE_COLOR_ALPHA,
        constants.COLORTYPE_ALPHA
      ].indexOf(options.colorType) === -1) {
        throw new Error(
          "option color type:" + options.colorType + " is not supported at present"
        );
      }
      if ([
        constants.COLORTYPE_GRAYSCALE,
        constants.COLORTYPE_COLOR,
        constants.COLORTYPE_COLOR_ALPHA,
        constants.COLORTYPE_ALPHA
      ].indexOf(options.inputColorType) === -1) {
        throw new Error(
          "option input color type:" + options.inputColorType + " is not supported at present"
        );
      }
      if (options.bitDepth !== 8 && options.bitDepth !== 16) {
        throw new Error(
          "option bit depth:" + options.bitDepth + " is not supported at present"
        );
      }
    };
    Packer.prototype.getDeflateOptions = function() {
      return {
        chunkSize: this._options.deflateChunkSize,
        level: this._options.deflateLevel,
        strategy: this._options.deflateStrategy
      };
    };
    Packer.prototype.createDeflate = function() {
      return this._options.deflateFactory(this.getDeflateOptions());
    };
    Packer.prototype.filterData = function(data, width, height) {
      let packedData = bitPacker(data, width, height, this._options);
      let bpp = constants.COLORTYPE_TO_BPP_MAP[this._options.colorType];
      let filteredData = filter(packedData, width, height, this._options, bpp);
      return filteredData;
    };
    Packer.prototype._packChunk = function(type, data) {
      let len = data ? data.length : 0;
      let buf = Buffer.alloc(len + 12);
      buf.writeUInt32BE(len, 0);
      buf.writeUInt32BE(type, 4);
      if (data) {
        data.copy(buf, 8);
      }
      buf.writeInt32BE(
        CrcStream.crc32(buf.slice(4, buf.length - 4)),
        buf.length - 4
      );
      return buf;
    };
    Packer.prototype.packGAMA = function(gamma) {
      let buf = Buffer.alloc(4);
      buf.writeUInt32BE(Math.floor(gamma * constants.GAMMA_DIVISION), 0);
      return this._packChunk(constants.TYPE_gAMA, buf);
    };
    Packer.prototype.packIHDR = function(width, height) {
      let buf = Buffer.alloc(13);
      buf.writeUInt32BE(width, 0);
      buf.writeUInt32BE(height, 4);
      buf[8] = this._options.bitDepth;
      buf[9] = this._options.colorType;
      buf[10] = 0;
      buf[11] = 0;
      buf[12] = 0;
      return this._packChunk(constants.TYPE_IHDR, buf);
    };
    Packer.prototype.packIDAT = function(data) {
      return this._packChunk(constants.TYPE_IDAT, data);
    };
    Packer.prototype.packIEND = function() {
      return this._packChunk(constants.TYPE_IEND, null);
    };
  }
});

// node_modules/pngjs/lib/packer-async.js
var require_packer_async = __commonJS({
  "node_modules/pngjs/lib/packer-async.js"(exports2, module2) {
    "use strict";
    var util = require("util");
    var Stream = require("stream");
    var constants = require_constants();
    var Packer = require_packer();
    var PackerAsync = module2.exports = function(opt) {
      Stream.call(this);
      let options = opt || {};
      this._packer = new Packer(options);
      this._deflate = this._packer.createDeflate();
      this.readable = true;
    };
    util.inherits(PackerAsync, Stream);
    PackerAsync.prototype.pack = function(data, width, height, gamma) {
      this.emit("data", Buffer.from(constants.PNG_SIGNATURE));
      this.emit("data", this._packer.packIHDR(width, height));
      if (gamma) {
        this.emit("data", this._packer.packGAMA(gamma));
      }
      let filteredData = this._packer.filterData(data, width, height);
      this._deflate.on("error", this.emit.bind(this, "error"));
      this._deflate.on(
        "data",
        function(compressedData) {
          this.emit("data", this._packer.packIDAT(compressedData));
        }.bind(this)
      );
      this._deflate.on(
        "end",
        function() {
          this.emit("data", this._packer.packIEND());
          this.emit("end");
        }.bind(this)
      );
      this._deflate.end(filteredData);
    };
  }
});

// node_modules/pngjs/lib/sync-inflate.js
var require_sync_inflate = __commonJS({
  "node_modules/pngjs/lib/sync-inflate.js"(exports2, module2) {
    "use strict";
    var assert = require("assert").ok;
    var zlib = require("zlib");
    var util = require("util");
    var kMaxLength = require("buffer").kMaxLength;
    function Inflate(opts) {
      if (!(this instanceof Inflate)) {
        return new Inflate(opts);
      }
      if (opts && opts.chunkSize < zlib.Z_MIN_CHUNK) {
        opts.chunkSize = zlib.Z_MIN_CHUNK;
      }
      zlib.Inflate.call(this, opts);
      this._offset = this._offset === void 0 ? this._outOffset : this._offset;
      this._buffer = this._buffer || this._outBuffer;
      if (opts && opts.maxLength != null) {
        this._maxLength = opts.maxLength;
      }
    }
    function createInflate(opts) {
      return new Inflate(opts);
    }
    function _close(engine, callback) {
      if (callback) {
        process.nextTick(callback);
      }
      if (!engine._handle) {
        return;
      }
      engine._handle.close();
      engine._handle = null;
    }
    Inflate.prototype._processChunk = function(chunk, flushFlag, asyncCb) {
      if (typeof asyncCb === "function") {
        return zlib.Inflate._processChunk.call(this, chunk, flushFlag, asyncCb);
      }
      let self = this;
      let availInBefore = chunk && chunk.length;
      let availOutBefore = this._chunkSize - this._offset;
      let leftToInflate = this._maxLength;
      let inOff = 0;
      let buffers = [];
      let nread = 0;
      let error;
      this.on("error", function(err) {
        error = err;
      });
      function handleChunk(availInAfter, availOutAfter) {
        if (self._hadError) {
          return;
        }
        let have = availOutBefore - availOutAfter;
        assert(have >= 0, "have should not go down");
        if (have > 0) {
          let out = self._buffer.slice(self._offset, self._offset + have);
          self._offset += have;
          if (out.length > leftToInflate) {
            out = out.slice(0, leftToInflate);
          }
          buffers.push(out);
          nread += out.length;
          leftToInflate -= out.length;
          if (leftToInflate === 0) {
            return false;
          }
        }
        if (availOutAfter === 0 || self._offset >= self._chunkSize) {
          availOutBefore = self._chunkSize;
          self._offset = 0;
          self._buffer = Buffer.allocUnsafe(self._chunkSize);
        }
        if (availOutAfter === 0) {
          inOff += availInBefore - availInAfter;
          availInBefore = availInAfter;
          return true;
        }
        return false;
      }
      assert(this._handle, "zlib binding closed");
      let res;
      do {
        res = this._handle.writeSync(
          flushFlag,
          chunk,
          // in
          inOff,
          // in_off
          availInBefore,
          // in_len
          this._buffer,
          // out
          this._offset,
          //out_off
          availOutBefore
        );
        res = res || this._writeState;
      } while (!this._hadError && handleChunk(res[0], res[1]));
      if (this._hadError) {
        throw error;
      }
      if (nread >= kMaxLength) {
        _close(this);
        throw new RangeError(
          "Cannot create final Buffer. It would be larger than 0x" + kMaxLength.toString(16) + " bytes"
        );
      }
      let buf = Buffer.concat(buffers, nread);
      _close(this);
      return buf;
    };
    util.inherits(Inflate, zlib.Inflate);
    function zlibBufferSync(engine, buffer) {
      if (typeof buffer === "string") {
        buffer = Buffer.from(buffer);
      }
      if (!(buffer instanceof Buffer)) {
        throw new TypeError("Not a string or buffer");
      }
      let flushFlag = engine._finishFlushFlag;
      if (flushFlag == null) {
        flushFlag = zlib.Z_FINISH;
      }
      return engine._processChunk(buffer, flushFlag);
    }
    function inflateSync(buffer, opts) {
      return zlibBufferSync(new Inflate(opts), buffer);
    }
    module2.exports = exports2 = inflateSync;
    exports2.Inflate = Inflate;
    exports2.createInflate = createInflate;
    exports2.inflateSync = inflateSync;
  }
});

// node_modules/pngjs/lib/sync-reader.js
var require_sync_reader = __commonJS({
  "node_modules/pngjs/lib/sync-reader.js"(exports2, module2) {
    "use strict";
    var SyncReader = module2.exports = function(buffer) {
      this._buffer = buffer;
      this._reads = [];
    };
    SyncReader.prototype.read = function(length, callback) {
      this._reads.push({
        length: Math.abs(length),
        // if length < 0 then at most this length
        allowLess: length < 0,
        func: callback
      });
    };
    SyncReader.prototype.process = function() {
      while (this._reads.length > 0 && this._buffer.length) {
        let read = this._reads[0];
        if (this._buffer.length && (this._buffer.length >= read.length || read.allowLess)) {
          this._reads.shift();
          let buf = this._buffer;
          this._buffer = buf.slice(read.length);
          read.func.call(this, buf.slice(0, read.length));
        } else {
          break;
        }
      }
      if (this._reads.length > 0) {
        return new Error("There are some read requests waitng on finished stream");
      }
      if (this._buffer.length > 0) {
        return new Error("unrecognised content at end of stream");
      }
    };
  }
});

// node_modules/pngjs/lib/filter-parse-sync.js
var require_filter_parse_sync = __commonJS({
  "node_modules/pngjs/lib/filter-parse-sync.js"(exports2) {
    "use strict";
    var SyncReader = require_sync_reader();
    var Filter = require_filter_parse();
    exports2.process = function(inBuffer, bitmapInfo) {
      let outBuffers = [];
      let reader = new SyncReader(inBuffer);
      let filter = new Filter(bitmapInfo, {
        read: reader.read.bind(reader),
        write: function(bufferPart) {
          outBuffers.push(bufferPart);
        },
        complete: function() {
        }
      });
      filter.start();
      reader.process();
      return Buffer.concat(outBuffers);
    };
  }
});

// node_modules/pngjs/lib/parser-sync.js
var require_parser_sync = __commonJS({
  "node_modules/pngjs/lib/parser-sync.js"(exports2, module2) {
    "use strict";
    var hasSyncZlib = true;
    var zlib = require("zlib");
    var inflateSync = require_sync_inflate();
    if (!zlib.deflateSync) {
      hasSyncZlib = false;
    }
    var SyncReader = require_sync_reader();
    var FilterSync = require_filter_parse_sync();
    var Parser = require_parser();
    var bitmapper = require_bitmapper();
    var formatNormaliser = require_format_normaliser();
    module2.exports = function(buffer, options) {
      if (!hasSyncZlib) {
        throw new Error(
          "To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0"
        );
      }
      let err;
      function handleError(_err_) {
        err = _err_;
      }
      let metaData;
      function handleMetaData(_metaData_) {
        metaData = _metaData_;
      }
      function handleTransColor(transColor) {
        metaData.transColor = transColor;
      }
      function handlePalette(palette) {
        metaData.palette = palette;
      }
      function handleSimpleTransparency() {
        metaData.alpha = true;
      }
      let gamma;
      function handleGamma(_gamma_) {
        gamma = _gamma_;
      }
      let inflateDataList = [];
      function handleInflateData(inflatedData2) {
        inflateDataList.push(inflatedData2);
      }
      let reader = new SyncReader(buffer);
      let parser = new Parser(options, {
        read: reader.read.bind(reader),
        error: handleError,
        metadata: handleMetaData,
        gamma: handleGamma,
        palette: handlePalette,
        transColor: handleTransColor,
        inflateData: handleInflateData,
        simpleTransparency: handleSimpleTransparency
      });
      parser.start();
      reader.process();
      if (err) {
        throw err;
      }
      let inflateData = Buffer.concat(inflateDataList);
      inflateDataList.length = 0;
      let inflatedData;
      if (metaData.interlace) {
        inflatedData = zlib.inflateSync(inflateData);
      } else {
        let rowSize = (metaData.width * metaData.bpp * metaData.depth + 7 >> 3) + 1;
        let imageSize = rowSize * metaData.height;
        inflatedData = inflateSync(inflateData, {
          chunkSize: imageSize,
          maxLength: imageSize
        });
      }
      inflateData = null;
      if (!inflatedData || !inflatedData.length) {
        throw new Error("bad png - invalid inflate data response");
      }
      let unfilteredData = FilterSync.process(inflatedData, metaData);
      inflateData = null;
      let bitmapData = bitmapper.dataToBitMap(unfilteredData, metaData);
      unfilteredData = null;
      let normalisedBitmapData = formatNormaliser(bitmapData, metaData);
      metaData.data = normalisedBitmapData;
      metaData.gamma = gamma || 0;
      return metaData;
    };
  }
});

// node_modules/pngjs/lib/packer-sync.js
var require_packer_sync = __commonJS({
  "node_modules/pngjs/lib/packer-sync.js"(exports2, module2) {
    "use strict";
    var hasSyncZlib = true;
    var zlib = require("zlib");
    if (!zlib.deflateSync) {
      hasSyncZlib = false;
    }
    var constants = require_constants();
    var Packer = require_packer();
    module2.exports = function(metaData, opt) {
      if (!hasSyncZlib) {
        throw new Error(
          "To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0"
        );
      }
      let options = opt || {};
      let packer = new Packer(options);
      let chunks = [];
      chunks.push(Buffer.from(constants.PNG_SIGNATURE));
      chunks.push(packer.packIHDR(metaData.width, metaData.height));
      if (metaData.gamma) {
        chunks.push(packer.packGAMA(metaData.gamma));
      }
      let filteredData = packer.filterData(
        metaData.data,
        metaData.width,
        metaData.height
      );
      let compressedData = zlib.deflateSync(
        filteredData,
        packer.getDeflateOptions()
      );
      filteredData = null;
      if (!compressedData || !compressedData.length) {
        throw new Error("bad png - invalid compressed data response");
      }
      chunks.push(packer.packIDAT(compressedData));
      chunks.push(packer.packIEND());
      return Buffer.concat(chunks);
    };
  }
});

// node_modules/pngjs/lib/png-sync.js
var require_png_sync = __commonJS({
  "node_modules/pngjs/lib/png-sync.js"(exports2) {
    "use strict";
    var parse2 = require_parser_sync();
    var pack = require_packer_sync();
    exports2.read = function(buffer, options) {
      return parse2(buffer, options || {});
    };
    exports2.write = function(png, options) {
      return pack(png, options);
    };
  }
});

// node_modules/pngjs/lib/png.js
var require_png = __commonJS({
  "node_modules/pngjs/lib/png.js"(exports2) {
    "use strict";
    var util = require("util");
    var Stream = require("stream");
    var Parser = require_parser_async();
    var Packer = require_packer_async();
    var PNGSync = require_png_sync();
    var PNG = exports2.PNG = function(options) {
      Stream.call(this);
      options = options || {};
      this.width = options.width | 0;
      this.height = options.height | 0;
      this.data = this.width > 0 && this.height > 0 ? Buffer.alloc(4 * this.width * this.height) : null;
      if (options.fill && this.data) {
        this.data.fill(0);
      }
      this.gamma = 0;
      this.readable = this.writable = true;
      this._parser = new Parser(options);
      this._parser.on("error", this.emit.bind(this, "error"));
      this._parser.on("close", this._handleClose.bind(this));
      this._parser.on("metadata", this._metadata.bind(this));
      this._parser.on("gamma", this._gamma.bind(this));
      this._parser.on(
        "parsed",
        function(data) {
          this.data = data;
          this.emit("parsed", data);
        }.bind(this)
      );
      this._packer = new Packer(options);
      this._packer.on("data", this.emit.bind(this, "data"));
      this._packer.on("end", this.emit.bind(this, "end"));
      this._parser.on("close", this._handleClose.bind(this));
      this._packer.on("error", this.emit.bind(this, "error"));
    };
    util.inherits(PNG, Stream);
    PNG.sync = PNGSync;
    PNG.prototype.pack = function() {
      if (!this.data || !this.data.length) {
        this.emit("error", "No data provided");
        return this;
      }
      process.nextTick(
        function() {
          this._packer.pack(this.data, this.width, this.height, this.gamma);
        }.bind(this)
      );
      return this;
    };
    PNG.prototype.parse = function(data, callback) {
      if (callback) {
        let onParsed, onError;
        onParsed = function(parsedData) {
          this.removeListener("error", onError);
          this.data = parsedData;
          callback(null, this);
        }.bind(this);
        onError = function(err) {
          this.removeListener("parsed", onParsed);
          callback(err, null);
        }.bind(this);
        this.once("parsed", onParsed);
        this.once("error", onError);
      }
      this.end(data);
      return this;
    };
    PNG.prototype.write = function(data) {
      this._parser.write(data);
      return true;
    };
    PNG.prototype.end = function(data) {
      this._parser.end(data);
    };
    PNG.prototype._metadata = function(metadata) {
      this.width = metadata.width;
      this.height = metadata.height;
      this.emit("metadata", metadata);
    };
    PNG.prototype._gamma = function(gamma) {
      this.gamma = gamma;
    };
    PNG.prototype._handleClose = function() {
      if (!this._parser.writable && !this._packer.readable) {
        this.emit("close");
      }
    };
    PNG.bitblt = function(src, dst, srcX, srcY, width, height, deltaX, deltaY) {
      srcX |= 0;
      srcY |= 0;
      width |= 0;
      height |= 0;
      deltaX |= 0;
      deltaY |= 0;
      if (srcX > src.width || srcY > src.height || srcX + width > src.width || srcY + height > src.height) {
        throw new Error("bitblt reading outside image");
      }
      if (deltaX > dst.width || deltaY > dst.height || deltaX + width > dst.width || deltaY + height > dst.height) {
        throw new Error("bitblt writing outside image");
      }
      for (let y = 0; y < height; y++) {
        src.data.copy(
          dst.data,
          (deltaY + y) * dst.width + deltaX << 2,
          (srcY + y) * src.width + srcX << 2,
          (srcY + y) * src.width + srcX + width << 2
        );
      }
    };
    PNG.prototype.bitblt = function(dst, srcX, srcY, width, height, deltaX, deltaY) {
      PNG.bitblt(this, dst, srcX, srcY, width, height, deltaX, deltaY);
      return this;
    };
    PNG.adjustGamma = function(src) {
      if (src.gamma) {
        for (let y = 0; y < src.height; y++) {
          for (let x = 0; x < src.width; x++) {
            let idx = src.width * y + x << 2;
            for (let i = 0; i < 3; i++) {
              let sample = src.data[idx + i] / 255;
              sample = Math.pow(sample, 1 / 2.2 / src.gamma);
              src.data[idx + i] = Math.round(sample * 255);
            }
          }
        }
        src.gamma = 0;
      }
    };
    PNG.prototype.adjustGamma = function() {
      PNG.adjustGamma(this);
    };
  }
});

// node_modules/qrcode/lib/renderer/utils.js
var require_utils3 = __commonJS({
  "node_modules/qrcode/lib/renderer/utils.js"(exports2) {
    function hex2rgba(hex) {
      if (typeof hex === "number") {
        hex = hex.toString();
      }
      if (typeof hex !== "string") {
        throw new Error("Color should be defined as hex string");
      }
      let hexCode = hex.slice().replace("#", "").split("");
      if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
        throw new Error("Invalid hex color: " + hex);
      }
      if (hexCode.length === 3 || hexCode.length === 4) {
        hexCode = Array.prototype.concat.apply([], hexCode.map(function(c) {
          return [c, c];
        }));
      }
      if (hexCode.length === 6) hexCode.push("F", "F");
      const hexValue = parseInt(hexCode.join(""), 16);
      return {
        r: hexValue >> 24 & 255,
        g: hexValue >> 16 & 255,
        b: hexValue >> 8 & 255,
        a: hexValue & 255,
        hex: "#" + hexCode.slice(0, 6).join("")
      };
    }
    exports2.getOptions = function getOptions(options) {
      if (!options) options = {};
      if (!options.color) options.color = {};
      const margin = typeof options.margin === "undefined" || options.margin === null || options.margin < 0 ? 4 : options.margin;
      const width = options.width && options.width >= 21 ? options.width : void 0;
      const scale = options.scale || 4;
      return {
        width,
        scale: width ? 4 : scale,
        margin,
        color: {
          dark: hex2rgba(options.color.dark || "#000000ff"),
          light: hex2rgba(options.color.light || "#ffffffff")
        },
        type: options.type,
        rendererOpts: options.rendererOpts || {}
      };
    };
    exports2.getScale = function getScale(qrSize, opts) {
      return opts.width && opts.width >= qrSize + opts.margin * 2 ? opts.width / (qrSize + opts.margin * 2) : opts.scale;
    };
    exports2.getImageWidth = function getImageWidth(qrSize, opts) {
      const scale = exports2.getScale(qrSize, opts);
      return Math.floor((qrSize + opts.margin * 2) * scale);
    };
    exports2.qrToImageData = function qrToImageData(imgData, qr, opts) {
      const size = qr.modules.size;
      const data = qr.modules.data;
      const scale = exports2.getScale(size, opts);
      const symbolSize = Math.floor((size + opts.margin * 2) * scale);
      const scaledMargin = opts.margin * scale;
      const palette = [opts.color.light, opts.color.dark];
      for (let i = 0; i < symbolSize; i++) {
        for (let j = 0; j < symbolSize; j++) {
          let posDst = (i * symbolSize + j) * 4;
          let pxColor = opts.color.light;
          if (i >= scaledMargin && j >= scaledMargin && i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
            const iSrc = Math.floor((i - scaledMargin) / scale);
            const jSrc = Math.floor((j - scaledMargin) / scale);
            pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];
          }
          imgData[posDst++] = pxColor.r;
          imgData[posDst++] = pxColor.g;
          imgData[posDst++] = pxColor.b;
          imgData[posDst] = pxColor.a;
        }
      }
    };
  }
});

// node_modules/qrcode/lib/renderer/png.js
var require_png2 = __commonJS({
  "node_modules/qrcode/lib/renderer/png.js"(exports2) {
    var fs = require("fs");
    var PNG = require_png().PNG;
    var Utils = require_utils3();
    exports2.render = function render(qrData, options) {
      const opts = Utils.getOptions(options);
      const pngOpts = opts.rendererOpts;
      const size = Utils.getImageWidth(qrData.modules.size, opts);
      pngOpts.width = size;
      pngOpts.height = size;
      const pngImage = new PNG(pngOpts);
      Utils.qrToImageData(pngImage.data, qrData, opts);
      return pngImage;
    };
    exports2.renderToDataURL = function renderToDataURL(qrData, options, cb) {
      if (typeof cb === "undefined") {
        cb = options;
        options = void 0;
      }
      exports2.renderToBuffer(qrData, options, function(err, output) {
        if (err) cb(err);
        let url = "data:image/png;base64,";
        url += output.toString("base64");
        cb(null, url);
      });
    };
    exports2.renderToBuffer = function renderToBuffer(qrData, options, cb) {
      if (typeof cb === "undefined") {
        cb = options;
        options = void 0;
      }
      const png = exports2.render(qrData, options);
      const buffer = [];
      png.on("error", cb);
      png.on("data", function(data) {
        buffer.push(data);
      });
      png.on("end", function() {
        cb(null, Buffer.concat(buffer));
      });
      png.pack();
    };
    exports2.renderToFile = function renderToFile(path2, qrData, options, cb) {
      if (typeof cb === "undefined") {
        cb = options;
        options = void 0;
      }
      let called = false;
      const done = (...args) => {
        if (called) return;
        called = true;
        cb.apply(null, args);
      };
      const stream = fs.createWriteStream(path2);
      stream.on("error", done);
      stream.on("close", done);
      exports2.renderToFileStream(stream, qrData, options);
    };
    exports2.renderToFileStream = function renderToFileStream(stream, qrData, options) {
      const png = exports2.render(qrData, options);
      png.pack().pipe(stream);
    };
  }
});

// node_modules/qrcode/lib/renderer/utf8.js
var require_utf8 = __commonJS({
  "node_modules/qrcode/lib/renderer/utf8.js"(exports2) {
    var Utils = require_utils3();
    var BLOCK_CHAR = {
      WW: " ",
      WB: "\u2584",
      BB: "\u2588",
      BW: "\u2580"
    };
    var INVERTED_BLOCK_CHAR = {
      BB: " ",
      BW: "\u2584",
      WW: "\u2588",
      WB: "\u2580"
    };
    function getBlockChar(top, bottom, blocks) {
      if (top && bottom) return blocks.BB;
      if (top && !bottom) return blocks.BW;
      if (!top && bottom) return blocks.WB;
      return blocks.WW;
    }
    exports2.render = function(qrData, options, cb) {
      const opts = Utils.getOptions(options);
      let blocks = BLOCK_CHAR;
      if (opts.color.dark.hex === "#ffffff" || opts.color.light.hex === "#000000") {
        blocks = INVERTED_BLOCK_CHAR;
      }
      const size = qrData.modules.size;
      const data = qrData.modules.data;
      let output = "";
      let hMargin = Array(size + opts.margin * 2 + 1).join(blocks.WW);
      hMargin = Array(opts.margin / 2 + 1).join(hMargin + "\n");
      const vMargin = Array(opts.margin + 1).join(blocks.WW);
      output += hMargin;
      for (let i = 0; i < size; i += 2) {
        output += vMargin;
        for (let j = 0; j < size; j++) {
          const topModule = data[i * size + j];
          const bottomModule = data[(i + 1) * size + j];
          output += getBlockChar(topModule, bottomModule, blocks);
        }
        output += vMargin + "\n";
      }
      output += hMargin.slice(0, -1);
      if (typeof cb === "function") {
        cb(null, output);
      }
      return output;
    };
    exports2.renderToFile = function renderToFile(path2, qrData, options, cb) {
      if (typeof cb === "undefined") {
        cb = options;
        options = void 0;
      }
      const fs = require("fs");
      const utf8 = exports2.render(qrData, options);
      fs.writeFile(path2, utf8, cb);
    };
  }
});

// node_modules/qrcode/lib/renderer/terminal/terminal.js
var require_terminal = __commonJS({
  "node_modules/qrcode/lib/renderer/terminal/terminal.js"(exports2) {
    exports2.render = function(qrData, options, cb) {
      const size = qrData.modules.size;
      const data = qrData.modules.data;
      const black = "\x1B[40m  \x1B[0m";
      const white = "\x1B[47m  \x1B[0m";
      let output = "";
      const hMargin = Array(size + 3).join(white);
      const vMargin = Array(2).join(white);
      output += hMargin + "\n";
      for (let i = 0; i < size; ++i) {
        output += white;
        for (let j = 0; j < size; j++) {
          output += data[i * size + j] ? black : white;
        }
        output += vMargin + "\n";
      }
      output += hMargin + "\n";
      if (typeof cb === "function") {
        cb(null, output);
      }
      return output;
    };
  }
});

// node_modules/qrcode/lib/renderer/terminal/terminal-small.js
var require_terminal_small = __commonJS({
  "node_modules/qrcode/lib/renderer/terminal/terminal-small.js"(exports2) {
    var backgroundWhite = "\x1B[47m";
    var backgroundBlack = "\x1B[40m";
    var foregroundWhite = "\x1B[37m";
    var foregroundBlack = "\x1B[30m";
    var reset = "\x1B[0m";
    var lineSetupNormal = backgroundWhite + foregroundBlack;
    var lineSetupInverse = backgroundBlack + foregroundWhite;
    var createPalette = function(lineSetup, foregroundWhite2, foregroundBlack2) {
      return {
        // 1 ... white, 2 ... black, 0 ... transparent (default)
        "00": reset + " " + lineSetup,
        "01": reset + foregroundWhite2 + "\u2584" + lineSetup,
        "02": reset + foregroundBlack2 + "\u2584" + lineSetup,
        10: reset + foregroundWhite2 + "\u2580" + lineSetup,
        11: " ",
        12: "\u2584",
        20: reset + foregroundBlack2 + "\u2580" + lineSetup,
        21: "\u2580",
        22: "\u2588"
      };
    };
    var mkCodePixel = function(modules, size, x, y) {
      const sizePlus = size + 1;
      if (x >= sizePlus || y >= sizePlus || y < -1 || x < -1) return "0";
      if (x >= size || y >= size || y < 0 || x < 0) return "1";
      const idx = y * size + x;
      return modules[idx] ? "2" : "1";
    };
    var mkCode = function(modules, size, x, y) {
      return mkCodePixel(modules, size, x, y) + mkCodePixel(modules, size, x, y + 1);
    };
    exports2.render = function(qrData, options, cb) {
      const size = qrData.modules.size;
      const data = qrData.modules.data;
      const inverse = !!(options && options.inverse);
      const lineSetup = options && options.inverse ? lineSetupInverse : lineSetupNormal;
      const white = inverse ? foregroundBlack : foregroundWhite;
      const black = inverse ? foregroundWhite : foregroundBlack;
      const palette = createPalette(lineSetup, white, black);
      const newLine = reset + "\n" + lineSetup;
      let output = lineSetup;
      for (let y = -1; y < size + 1; y += 2) {
        for (let x = -1; x < size; x++) {
          output += palette[mkCode(data, size, x, y)];
        }
        output += palette[mkCode(data, size, size, y)] + newLine;
      }
      output += reset;
      if (typeof cb === "function") {
        cb(null, output);
      }
      return output;
    };
  }
});

// node_modules/qrcode/lib/renderer/terminal.js
var require_terminal2 = __commonJS({
  "node_modules/qrcode/lib/renderer/terminal.js"(exports2) {
    var big = require_terminal();
    var small = require_terminal_small();
    exports2.render = function(qrData, options, cb) {
      if (options && options.small) {
        return small.render(qrData, options, cb);
      }
      return big.render(qrData, options, cb);
    };
  }
});

// node_modules/qrcode/lib/renderer/svg-tag.js
var require_svg_tag = __commonJS({
  "node_modules/qrcode/lib/renderer/svg-tag.js"(exports2) {
    var Utils = require_utils3();
    function getColorAttrib(color, attrib) {
      const alpha = color.a / 255;
      const str = attrib + '="' + color.hex + '"';
      return alpha < 1 ? str + " " + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"' : str;
    }
    function svgCmd(cmd, x, y) {
      let str = cmd + x;
      if (typeof y !== "undefined") str += " " + y;
      return str;
    }
    function qrToPath(data, size, margin) {
      let path2 = "";
      let moveBy = 0;
      let newRow = false;
      let lineLength = 0;
      for (let i = 0; i < data.length; i++) {
        const col = Math.floor(i % size);
        const row = Math.floor(i / size);
        if (!col && !newRow) newRow = true;
        if (data[i]) {
          lineLength++;
          if (!(i > 0 && col > 0 && data[i - 1])) {
            path2 += newRow ? svgCmd("M", col + margin, 0.5 + row + margin) : svgCmd("m", moveBy, 0);
            moveBy = 0;
            newRow = false;
          }
          if (!(col + 1 < size && data[i + 1])) {
            path2 += svgCmd("h", lineLength);
            lineLength = 0;
          }
        } else {
          moveBy++;
        }
      }
      return path2;
    }
    exports2.render = function render(qrData, options, cb) {
      const opts = Utils.getOptions(options);
      const size = qrData.modules.size;
      const data = qrData.modules.data;
      const qrcodesize = size + opts.margin * 2;
      const bg = !opts.color.light.a ? "" : "<path " + getColorAttrib(opts.color.light, "fill") + ' d="M0 0h' + qrcodesize + "v" + qrcodesize + 'H0z"/>';
      const path2 = "<path " + getColorAttrib(opts.color.dark, "stroke") + ' d="' + qrToPath(data, size, opts.margin) + '"/>';
      const viewBox = 'viewBox="0 0 ' + qrcodesize + " " + qrcodesize + '"';
      const width = !opts.width ? "" : 'width="' + opts.width + '" height="' + opts.width + '" ';
      const svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path2 + "</svg>\n";
      if (typeof cb === "function") {
        cb(null, svgTag);
      }
      return svgTag;
    };
  }
});

// node_modules/qrcode/lib/renderer/svg.js
var require_svg = __commonJS({
  "node_modules/qrcode/lib/renderer/svg.js"(exports2) {
    var svgTagRenderer = require_svg_tag();
    exports2.render = svgTagRenderer.render;
    exports2.renderToFile = function renderToFile(path2, qrData, options, cb) {
      if (typeof cb === "undefined") {
        cb = options;
        options = void 0;
      }
      const fs = require("fs");
      const svgTag = exports2.render(qrData, options);
      const xmlStr = '<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">' + svgTag;
      fs.writeFile(path2, xmlStr, cb);
    };
  }
});

// node_modules/qrcode/lib/renderer/canvas.js
var require_canvas = __commonJS({
  "node_modules/qrcode/lib/renderer/canvas.js"(exports2) {
    var Utils = require_utils3();
    function clearCanvas(ctx, canvas, size) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!canvas.style) canvas.style = {};
      canvas.height = size;
      canvas.width = size;
      canvas.style.height = size + "px";
      canvas.style.width = size + "px";
    }
    function getCanvasElement() {
      try {
        return document.createElement("canvas");
      } catch (e) {
        throw new Error("You need to specify a canvas element");
      }
    }
    exports2.render = function render(qrData, canvas, options) {
      let opts = options;
      let canvasEl = canvas;
      if (typeof opts === "undefined" && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = void 0;
      }
      if (!canvas) {
        canvasEl = getCanvasElement();
      }
      opts = Utils.getOptions(opts);
      const size = Utils.getImageWidth(qrData.modules.size, opts);
      const ctx = canvasEl.getContext("2d");
      const image = ctx.createImageData(size, size);
      Utils.qrToImageData(image.data, qrData, opts);
      clearCanvas(ctx, canvasEl, size);
      ctx.putImageData(image, 0, 0);
      return canvasEl;
    };
    exports2.renderToDataURL = function renderToDataURL(qrData, canvas, options) {
      let opts = options;
      if (typeof opts === "undefined" && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = void 0;
      }
      if (!opts) opts = {};
      const canvasEl = exports2.render(qrData, canvas, opts);
      const type = opts.type || "image/png";
      const rendererOpts = opts.rendererOpts || {};
      return canvasEl.toDataURL(type, rendererOpts.quality);
    };
  }
});

// node_modules/qrcode/lib/browser.js
var require_browser2 = __commonJS({
  "node_modules/qrcode/lib/browser.js"(exports2) {
    var canPromise = require_can_promise();
    var QRCode2 = require_qrcode();
    var CanvasRenderer = require_canvas();
    var SvgRenderer = require_svg_tag();
    function renderCanvas(renderFunc, canvas, text, opts, cb) {
      const args = [].slice.call(arguments, 1);
      const argsNum = args.length;
      const isLastArgCb = typeof args[argsNum - 1] === "function";
      if (!isLastArgCb && !canPromise()) {
        throw new Error("Callback required as last argument");
      }
      if (isLastArgCb) {
        if (argsNum < 2) {
          throw new Error("Too few arguments provided");
        }
        if (argsNum === 2) {
          cb = text;
          text = canvas;
          canvas = opts = void 0;
        } else if (argsNum === 3) {
          if (canvas.getContext && typeof cb === "undefined") {
            cb = opts;
            opts = void 0;
          } else {
            cb = opts;
            opts = text;
            text = canvas;
            canvas = void 0;
          }
        }
      } else {
        if (argsNum < 1) {
          throw new Error("Too few arguments provided");
        }
        if (argsNum === 1) {
          text = canvas;
          canvas = opts = void 0;
        } else if (argsNum === 2 && !canvas.getContext) {
          opts = text;
          text = canvas;
          canvas = void 0;
        }
        return new Promise(function(resolve, reject) {
          try {
            const data = QRCode2.create(text, opts);
            resolve(renderFunc(data, canvas, opts));
          } catch (e) {
            reject(e);
          }
        });
      }
      try {
        const data = QRCode2.create(text, opts);
        cb(null, renderFunc(data, canvas, opts));
      } catch (e) {
        cb(e);
      }
    }
    exports2.create = QRCode2.create;
    exports2.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);
    exports2.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL);
    exports2.toString = renderCanvas.bind(null, function(data, _, opts) {
      return SvgRenderer.render(data, opts);
    });
  }
});

// node_modules/qrcode/lib/server.js
var require_server = __commonJS({
  "node_modules/qrcode/lib/server.js"(exports2) {
    var canPromise = require_can_promise();
    var QRCode2 = require_qrcode();
    var PngRenderer = require_png2();
    var Utf8Renderer = require_utf8();
    var TerminalRenderer = require_terminal2();
    var SvgRenderer = require_svg();
    function checkParams(text, opts, cb) {
      if (typeof text === "undefined") {
        throw new Error("String required as first argument");
      }
      if (typeof cb === "undefined") {
        cb = opts;
        opts = {};
      }
      if (typeof cb !== "function") {
        if (!canPromise()) {
          throw new Error("Callback required as last argument");
        } else {
          opts = cb || {};
          cb = null;
        }
      }
      return {
        opts,
        cb
      };
    }
    function getTypeFromFilename(path2) {
      return path2.slice((path2.lastIndexOf(".") - 1 >>> 0) + 2).toLowerCase();
    }
    function getRendererFromType(type) {
      switch (type) {
        case "svg":
          return SvgRenderer;
        case "txt":
        case "utf8":
          return Utf8Renderer;
        case "png":
        case "image/png":
        default:
          return PngRenderer;
      }
    }
    function getStringRendererFromType(type) {
      switch (type) {
        case "svg":
          return SvgRenderer;
        case "terminal":
          return TerminalRenderer;
        case "utf8":
        default:
          return Utf8Renderer;
      }
    }
    function render(renderFunc, text, params) {
      if (!params.cb) {
        return new Promise(function(resolve, reject) {
          try {
            const data = QRCode2.create(text, params.opts);
            return renderFunc(data, params.opts, function(err, data2) {
              return err ? reject(err) : resolve(data2);
            });
          } catch (e) {
            reject(e);
          }
        });
      }
      try {
        const data = QRCode2.create(text, params.opts);
        return renderFunc(data, params.opts, params.cb);
      } catch (e) {
        params.cb(e);
      }
    }
    exports2.create = QRCode2.create;
    exports2.toCanvas = require_browser2().toCanvas;
    exports2.toString = function toString(text, opts, cb) {
      const params = checkParams(text, opts, cb);
      const type = params.opts ? params.opts.type : void 0;
      const renderer = getStringRendererFromType(type);
      return render(renderer.render, text, params);
    };
    exports2.toDataURL = function toDataURL(text, opts, cb) {
      const params = checkParams(text, opts, cb);
      const renderer = getRendererFromType(params.opts.type);
      return render(renderer.renderToDataURL, text, params);
    };
    exports2.toBuffer = function toBuffer(text, opts, cb) {
      const params = checkParams(text, opts, cb);
      const renderer = getRendererFromType(params.opts.type);
      return render(renderer.renderToBuffer, text, params);
    };
    exports2.toFile = function toFile(path2, text, opts, cb) {
      if (typeof path2 !== "string" || !(typeof text === "string" || typeof text === "object")) {
        throw new Error("Invalid argument");
      }
      if (arguments.length < 3 && !canPromise()) {
        throw new Error("Too few arguments provided");
      }
      const params = checkParams(text, opts, cb);
      const type = params.opts.type || getTypeFromFilename(path2);
      const renderer = getRendererFromType(type);
      const renderToFile = renderer.renderToFile.bind(null, path2);
      return render(renderToFile, text, params);
    };
    exports2.toFileStream = function toFileStream(stream, text, opts) {
      if (arguments.length < 2) {
        throw new Error("Too few arguments provided");
      }
      const params = checkParams(text, opts, stream.emit.bind(stream, "error"));
      const renderer = getRendererFromType("png");
      const renderToFileStream = renderer.renderToFileStream.bind(null, stream);
      render(renderToFileStream, text, params);
    };
  }
});

// node_modules/qrcode/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/qrcode/lib/index.js"(exports2, module2) {
    module2.exports = require_server();
  }
});

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => MemoFlowSyncBridgePlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var http = __toESM(require("node:http"));
var crypto = __toESM(require("node:crypto"));
var os = __toESM(require("node:os"));
var path = __toESM(require("node:path"));
var import_node_buffer = require("node:buffer");
var import_bonjour = __toESM(require_bonjour());
var import_busboy = __toESM(require_lib());
var import_qrcode = __toESM(require_lib2());
var DEFAULT_SETTINGS = {
  port: 3e3,
  inboxFolder: "Inbox",
  attachmentsFolder: "attachments",
  pairCodeTtlSeconds: 120,
  maxFileSizeMB: 200,
  advertisedName: ""
};
var BRIDGE_API_VERSION = "bridge-v1";
var MemoFlowSyncBridgePlugin = class extends import_obsidian.Plugin {
  settings = { ...DEFAULT_SETTINGS };
  authorizedDevices = {};
  server = null;
  bonjourInstance = null;
  bonjourService = null;
  currentPairCode = "";
  pairCodeExpiresAt = 0;
  async onload() {
    await this.loadPluginData();
    this.regeneratePairCode(false);
    this.addSettingTab(new MemoFlowBridgeSettingTab(this.app, this));
    this.addCommand({
      id: "memoflow-bridge-show-pair-qr",
      name: "\u663E\u793A\u914D\u5BF9\u4E8C\u7EF4\u7801 / Show Pairing QR",
      callback: () => {
        const modal = new PairQrModal(this.app, this);
        modal.open();
      }
    });
    this.addCommand({
      id: "memoflow-bridge-regenerate-pair-code",
      name: "\u91CD\u7F6E\u914D\u5BF9\u7801 / Regenerate Pairing Code",
      callback: async () => {
        this.regeneratePairCode(true);
        await this.persistPluginData();
      }
    });
    this.addRibbonIcon(
      "refresh-cw",
      "MemoFlow \u540C\u6B65 / MemoFlow Sync",
      async () => {
        if (!this.isPairCodeAlive()) {
          this.regeneratePairCode(false);
          await this.persistPluginData();
        }
        new PairQrModal(this.app, this).open();
      }
    );
    await this.startBridge();
  }
  async onunload() {
    await this.stopBridge();
  }
  async restartBridge() {
    await this.stopBridge();
    await this.startBridge();
  }
  getPairUri() {
    const host = this.resolveLanAddress();
    const serverName = this.resolveAdvertisedName();
    const params = new URLSearchParams({
      host,
      port: String(this.settings.port),
      pairCode: this.currentPairCode,
      api: BRIDGE_API_VERSION,
      name: serverName
    });
    return `memoflow://pair?${params.toString()}`;
  }
  getCurrentPairCode() {
    return this.currentPairCode;
  }
  getPairCodeExpiresAt() {
    return this.pairCodeExpiresAt;
  }
  isPairCodeAlive(nowMs = Date.now()) {
    return nowMs <= this.pairCodeExpiresAt;
  }
  regeneratePairCode(showNotice) {
    this.currentPairCode = this.randomToken(6);
    this.pairCodeExpiresAt = Date.now() + this.settings.pairCodeTtlSeconds * 1e3;
    if (showNotice) {
      new import_obsidian.Notice(
        `\u914D\u5BF9\u7801\u5DF2\u91CD\u7F6E\uFF08${this.settings.pairCodeTtlSeconds} \u79D2\u540E\u8FC7\u671F\uFF09 / Pair code regenerated (${this.settings.pairCodeTtlSeconds}s).`
      );
    }
  }
  async startBridge() {
    await this.startHttpServer();
    this.startMdns();
    new import_obsidian.Notice(
      `MemoFlow \u540C\u6B65\u6865\u5DF2\u542F\u52A8\uFF08\u7AEF\u53E3 ${this.settings.port}\uFF09 / MemoFlow Sync Bridge started on port ${this.settings.port}.`
    );
  }
  async stopBridge() {
    await this.stopHttpServer();
    this.stopMdns();
  }
  async startHttpServer() {
    this.server = http.createServer((req, res) => {
      void this.handleRequest(req, res);
    });
    await new Promise((resolve, reject) => {
      const onError = (error) => {
        reject(error);
      };
      this.server?.once("error", onError);
      this.server?.listen(this.settings.port, "0.0.0.0", () => {
        this.server?.off("error", onError);
        resolve();
      });
    });
    const address = this.server.address();
    if (address && typeof address !== "string") {
      const actualPort = address.port;
      if (actualPort !== this.settings.port) {
        this.settings.port = actualPort;
        await this.persistPluginData();
      }
    }
  }
  async stopHttpServer() {
    if (!this.server) return;
    const server = this.server;
    this.server = null;
    await new Promise((resolve) => {
      server.close(() => resolve());
    });
  }
  startMdns() {
    this.stopMdns();
    try {
      this.bonjourInstance = (0, import_bonjour.default)();
      this.bonjourService = this.bonjourInstance.publish({
        name: this.resolveAdvertisedName(),
        type: "memoflow",
        protocol: "tcp",
        port: this.settings.port,
        txt: {
          ver: "1",
          api: BRIDGE_API_VERSION,
          name: this.resolveAdvertisedName(),
          pair: "1",
          host: this.resolveLanAddress()
        }
      });
    } catch (error) {
      new import_obsidian.Notice(`mDNS \u542F\u52A8\u5931\u8D25 / mDNS start failed: ${String(error)}`);
    }
  }
  stopMdns() {
    try {
      if (this.bonjourService) {
        this.bonjourService.stop();
      }
      if (this.bonjourInstance) {
        this.bonjourInstance.unpublishAll();
        this.bonjourInstance.destroy();
      }
    } catch (_) {
    }
    this.bonjourService = null;
    this.bonjourInstance = null;
  }
  async handleRequest(req, res) {
    const method = (req.method ?? "GET").toUpperCase();
    const url = new URL(req.url ?? "/", "http://127.0.0.1");
    try {
      if (method === "GET" && url.pathname === "/bridge/v1/health") {
        this.writeJson(res, 200, {
          ok: true,
          apiVersion: BRIDGE_API_VERSION,
          port: this.settings.port,
          pairCodeExpiresAt: this.pairCodeExpiresAt,
          serverName: this.resolveAdvertisedName()
        });
        return;
      }
      if (method === "POST" && url.pathname === "/bridge/v1/pair/confirm") {
        await this.handlePairConfirm(req, res);
        return;
      }
      if (method === "POST" && url.pathname === "/bridge/v1/memo/upload") {
        await this.handleMemoUpload(req, res);
        return;
      }
      this.writeJson(res, 404, {
        ok: false,
        error: "NOT_FOUND"
      });
    } catch (error) {
      this.writeJson(res, 500, {
        ok: false,
        error: "INTERNAL_ERROR",
        message: String(error)
      });
    }
  }
  async handlePairConfirm(req, res) {
    const payload = await this.readJsonBody(req, 64 * 1024);
    const pairCode = this.readString(payload, "pairCode");
    const deviceName = this.readString(payload, "deviceName") || "MemoFlow Mobile";
    if (!pairCode) {
      this.writeJson(res, 400, {
        ok: false,
        error: "PAIR_CODE_REQUIRED"
      });
      return;
    }
    if (Date.now() > this.pairCodeExpiresAt || pairCode !== this.currentPairCode) {
      this.writeJson(res, 401, {
        ok: false,
        error: "PAIR_CODE_INVALID"
      });
      return;
    }
    const token = crypto.randomBytes(24).toString("hex");
    this.authorizedDevices[token] = {
      deviceName,
      createdAt: Date.now(),
      lastSeenAt: Date.now()
    };
    await this.persistPluginData();
    this.writeJson(res, 200, {
      ok: true,
      token,
      serverName: this.resolveAdvertisedName(),
      apiVersion: BRIDGE_API_VERSION
    });
  }
  async handleMemoUpload(req, res) {
    const token = this.readBearerToken(req);
    const device = token ? this.authorizedDevices[token] : void 0;
    if (!device) {
      this.writeJson(res, 401, {
        ok: false,
        error: "TOKEN_INVALID"
      });
      return;
    }
    const { fields, files } = await this.readMultipartForm(req);
    const metaRaw = fields.meta ?? "";
    if (!metaRaw.trim()) {
      this.writeJson(res, 400, {
        ok: false,
        error: "META_REQUIRED"
      });
      return;
    }
    let meta;
    try {
      const decoded = JSON.parse(metaRaw);
      if (!decoded || typeof decoded !== "object") {
        throw new Error("meta should be an object");
      }
      meta = decoded;
    } catch (error) {
      this.writeJson(res, 400, {
        ok: false,
        error: "META_INVALID",
        message: String(error)
      });
      return;
    }
    const result = await this.writeMemoToVault(meta, files);
    device.lastSeenAt = Date.now();
    await this.persistPluginData();
    this.writeJson(res, 200, {
      ok: true,
      memoPath: result.memoPath,
      attachments: result.attachments
    });
  }
  async writeMemoToVault(meta, files) {
    const content = this.readString(meta, "content");
    const createdAt = this.parseTimestamp(this.readString(meta, "createdAt"));
    const inboxFolder = (0, import_obsidian.normalizePath)(this.settings.inboxFolder || "Inbox");
    const attachmentsFolder = (0, import_obsidian.normalizePath)(
      this.settings.attachmentsFolder || "attachments"
    );
    await this.ensureFolderExists(inboxFolder);
    await this.ensureFolderExists(attachmentsFolder);
    const writtenAttachments = [];
    for (const file of files) {
      const writeResult = await this.writeAttachment(attachmentsFolder, file);
      writtenAttachments.push(writeResult);
    }
    const attachmentLines = writtenAttachments.map((it) => it.markdown);
    const bodyLines = [];
    if (content.trim().length > 0) {
      bodyLines.push(content.trimEnd());
    }
    if (attachmentLines.length > 0) {
      if (bodyLines.length > 0) {
        bodyLines.push("");
      }
      bodyLines.push(...attachmentLines);
    }
    const fileName = `${this.formatTimestampForFile(createdAt)}-${this.randomToken(3)}.md`;
    const memoPath = await this.allocateUniquePath(inboxFolder, fileName);
    const markdown = `${bodyLines.join("\n")}
`;
    await this.app.vault.adapter.write(memoPath, markdown);
    return { memoPath, attachments: writtenAttachments };
  }
  async writeAttachment(attachmentsFolder, file) {
    const originalName = file.fileName.trim() || "file";
    const hash = crypto.createHash("sha256").update(file.data).digest("hex");
    const parsed = path.parse(originalName);
    const safeBase = this.sanitizeFileStem(parsed.name || "file");
    const extension = this.resolveExtension(file.fileName, file.mimeType);
    const fileName = `${hash.slice(0, 12)}_${safeBase}${extension}`;
    const vaultPath = await this.allocateUniquePath(attachmentsFolder, fileName);
    await this.app.vault.adapter.writeBinary(vaultPath, this.toArrayBuffer(file.data));
    const mimeType = file.mimeType.toLowerCase();
    const isEmbed = mimeType.startsWith("image/") || mimeType.startsWith("video/") || mimeType.startsWith("audio/");
    const markdown = isEmbed ? `![[${vaultPath}]]` : `[[${vaultPath}]]`;
    return {
      originalName,
      vaultPath,
      markdown
    };
  }
  async readMultipartForm(req) {
    return await new Promise((resolve, reject) => {
      const fields = {};
      const files = [];
      const maxBytes = this.settings.maxFileSizeMB * 1024 * 1024;
      let finalError = null;
      const busboy = (0, import_busboy.default)({
        headers: req.headers,
        limits: {
          fileSize: maxBytes,
          files: 32,
          fields: 64
        }
      });
      busboy.on(
        "file",
        (fieldName, stream, info) => {
          const chunks = [];
          stream.on("data", (chunk) => {
            if (finalError) return;
            chunks.push(typeof chunk === "string" ? import_node_buffer.Buffer.from(chunk) : chunk);
          });
          stream.on("limit", () => {
            finalError = new Error(
              `File exceeds max size (${this.settings.maxFileSizeMB}MB).`
            );
          });
          stream.on("end", () => {
            if (finalError) return;
            files.push({
              fieldName,
              fileName: info.filename ?? "file",
              mimeType: info.mimeType ?? "application/octet-stream",
              data: import_node_buffer.Buffer.concat(chunks)
            });
          });
        }
      );
      busboy.on("field", (fieldName, value) => {
        fields[fieldName] = value;
      });
      busboy.on("error", (error) => {
        reject(error);
      });
      busboy.on("finish", () => {
        if (finalError) {
          reject(finalError);
          return;
        }
        resolve({ fields, files });
      });
      req.pipe(busboy);
    });
  }
  async readJsonBody(req, maxBytes) {
    const chunks = [];
    let total = 0;
    await new Promise((resolve, reject) => {
      req.on("data", (chunk) => {
        const buf = typeof chunk === "string" ? import_node_buffer.Buffer.from(chunk) : chunk;
        total += buf.length;
        if (total > maxBytes) {
          reject(new Error("Request body too large"));
          req.destroy();
          return;
        }
        chunks.push(buf);
      });
      req.on("end", () => resolve());
      req.on("error", (error) => reject(error));
    });
    const raw = import_node_buffer.Buffer.concat(chunks).toString("utf8").trim();
    if (!raw) return {};
    const data = JSON.parse(raw);
    if (data && typeof data === "object") {
      return data;
    }
    throw new Error("JSON payload should be an object");
  }
  writeJson(res, statusCode, body) {
    const text = JSON.stringify(body);
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.end(text);
  }
  readString(payload, key) {
    const value = payload[key];
    if (typeof value === "string") {
      return value.trim();
    }
    return "";
  }
  readBearerToken(req) {
    const auth = req.headers.authorization;
    if (!auth || typeof auth !== "string") return "";
    const match = auth.match(/^Bearer\s+(.+)$/i);
    if (!match) return "";
    return match[1]?.trim() ?? "";
  }
  parseTimestamp(value) {
    const parsed = Date.parse(value);
    if (Number.isNaN(parsed)) {
      return /* @__PURE__ */ new Date();
    }
    return new Date(parsed);
  }
  formatTimestampForFile(date) {
    const y = date.getFullYear().toString().padStart(4, "0");
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const d = date.getDate().toString().padStart(2, "0");
    const hh = date.getHours().toString().padStart(2, "0");
    const mm = date.getMinutes().toString().padStart(2, "0");
    const ss = date.getSeconds().toString().padStart(2, "0");
    return `${y}-${m}-${d}-${hh}${mm}${ss}`;
  }
  sanitizeFileStem(value) {
    const normalized = value.replace(/[\\/:*?"<>|]/g, "_").replace(/\s+/g, "-").replace(/[^a-zA-Z0-9._-]/g, "_").trim();
    if (!normalized) return "file";
    return normalized.slice(0, 64);
  }
  resolveExtension(fileName, mimeType) {
    const ext = path.extname(fileName).toLowerCase().trim();
    if (ext) return ext;
    const mime = mimeType.toLowerCase();
    const map = {
      "image/jpeg": ".jpg",
      "image/png": ".png",
      "image/gif": ".gif",
      "image/webp": ".webp",
      "video/mp4": ".mp4",
      "video/quicktime": ".mov",
      "audio/mpeg": ".mp3",
      "audio/mp4": ".m4a",
      "application/pdf": ".pdf"
    };
    return map[mime] ?? ".bin";
  }
  async allocateUniquePath(folder, fileName) {
    const parsed = path.parse(fileName);
    let candidate = (0, import_obsidian.normalizePath)(`${folder}/${fileName}`);
    let index = 1;
    while (await this.app.vault.adapter.exists(candidate)) {
      candidate = (0, import_obsidian.normalizePath)(
        `${folder}/${parsed.name}-${index}${parsed.ext}`
      );
      index += 1;
    }
    return candidate;
  }
  async ensureFolderExists(folderPath) {
    const normalized = (0, import_obsidian.normalizePath)(folderPath.trim());
    if (!normalized || normalized === ".") return;
    const segments = normalized.split("/").filter((segment) => segment.length > 0);
    let current = "";
    for (const segment of segments) {
      current = current ? `${current}/${segment}` : segment;
      const exists = await this.app.vault.adapter.exists(current);
      if (exists) continue;
      try {
        await this.app.vault.createFolder(current);
      } catch (_) {
      }
    }
  }
  toArrayBuffer(buffer) {
    return buffer.buffer.slice(
      buffer.byteOffset,
      buffer.byteOffset + buffer.byteLength
    );
  }
  resolveLanAddress() {
    const interfaces = os.networkInterfaces();
    for (const addresses of Object.values(interfaces)) {
      if (!addresses) continue;
      for (const item of addresses) {
        if (!item) continue;
        if (item.internal) continue;
        const family = typeof item.family === "string" ? item.family : "";
        if (family !== "IPv4") continue;
        const address = item.address.trim();
        if (!address) continue;
        return address;
      }
    }
    return "127.0.0.1";
  }
  resolveAdvertisedName() {
    const configured = this.settings.advertisedName.trim();
    if (configured) return configured;
    return `MemoFlow-${os.hostname()}`;
  }
  randomToken(bytes) {
    return crypto.randomBytes(bytes).toString("hex");
  }
  parsePositiveInt(raw, fallback, min, max) {
    const parsed = Number.parseInt(raw.trim(), 10);
    if (!Number.isFinite(parsed)) return fallback;
    if (parsed < min || parsed > max) return fallback;
    return parsed;
  }
  async loadPluginData() {
    const raw = await this.loadData();
    this.settings = {
      ...DEFAULT_SETTINGS,
      ...raw?.settings ?? {}
    };
    this.settings.port = this.parsePositiveInt(
      String(this.settings.port),
      DEFAULT_SETTINGS.port,
      1,
      65535
    );
    this.settings.pairCodeTtlSeconds = this.parsePositiveInt(
      String(this.settings.pairCodeTtlSeconds),
      DEFAULT_SETTINGS.pairCodeTtlSeconds,
      30,
      86400
    );
    this.settings.maxFileSizeMB = this.parsePositiveInt(
      String(this.settings.maxFileSizeMB),
      DEFAULT_SETTINGS.maxFileSizeMB,
      1,
      2048
    );
    this.authorizedDevices = raw?.authorizedDevices ?? {};
  }
  async persistPluginData() {
    const data = {
      settings: this.settings,
      authorizedDevices: this.authorizedDevices
    };
    await this.saveData(data);
  }
};
var MemoFlowBridgeSettingTab = class extends import_obsidian.PluginSettingTab {
  plugin;
  pairCodeTicker = null;
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  clearPairCodeTicker() {
    if (this.pairCodeTicker !== null) {
      window.clearInterval(this.pairCodeTicker);
      this.pairCodeTicker = null;
    }
  }
  hide() {
    this.clearPairCodeTicker();
  }
  display() {
    this.clearPairCodeTicker();
    const { containerEl } = this;
    containerEl.empty();
    new import_obsidian.Setting(containerEl).setName("MemoFlow Sync Bridge / MemoFlow \u540C\u6B65\u6865").setHeading();
    let pairCodeText = null;
    let pairCodeButton = null;
    const pairCodeSetting = new import_obsidian.Setting(containerEl).setName("\u5F53\u524D\u914D\u5BF9\u7801 / Current Pair Code").addText((text) => {
      pairCodeText = text;
      text.inputEl.readOnly = true;
    }).addButton((button) => {
      pairCodeButton = button;
      button.setCta().onClick(async () => {
        const isAlive = this.plugin.isPairCodeAlive();
        if (!isAlive) {
          this.plugin.regeneratePairCode(true);
          await this.plugin.persistPluginData();
          renderPairCodeSetting();
          return;
        }
        const pairCode = this.plugin.getCurrentPairCode();
        if (!pairCode) {
          new import_obsidian.Notice("\u5F53\u524D\u65E0\u53EF\u7528\u914D\u5BF9\u7801 / No active pair code.");
          return;
        }
        try {
          await navigator.clipboard.writeText(pairCode);
          new import_obsidian.Notice("\u914D\u5BF9\u7801\u5DF2\u590D\u5236 / Pair code copied.");
        } catch (_) {
          new import_obsidian.Notice("\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u590D\u5236 / Copy failed. Please copy manually.");
        }
      });
    });
    const renderPairCodeSetting = () => {
      const pairCode = this.plugin.getCurrentPairCode();
      const expiresInSec = Math.max(
        0,
        Math.ceil((this.plugin.getPairCodeExpiresAt() - Date.now()) / 1e3)
      );
      const isAlive = expiresInSec > 0;
      const pairCodeStatus = isAlive ? `\u5269\u4F59 ${expiresInSec} \u79D2 / Expires in ${expiresInSec}s` : "\u5DF2\u8FC7\u671F\uFF0C\u8BF7\u91CD\u7F6E / Expired, regenerate";
      pairCodeSetting.setDesc(
        `\u624B\u673A\u624B\u52A8\u914D\u5BF9\u53EF\u76F4\u63A5\u8F93\u5165\u6B64\u7801\u3002${pairCodeStatus} / Enter this code in mobile app manual pairing. ${pairCodeStatus}`
      );
      pairCodeText?.setValue(pairCode);
      pairCodeButton?.setButtonText(
        isAlive ? "\u590D\u5236 / Copy" : "\u91CD\u7F6E / Regenerate"
      );
    };
    renderPairCodeSetting();
    this.pairCodeTicker = window.setInterval(() => {
      if (!containerEl.isConnected || containerEl.offsetParent === null) {
        this.clearPairCodeTicker();
        return;
      }
      renderPairCodeSetting();
    }, 1e3);
    new import_obsidian.Setting(containerEl).setName("\u7AEF\u53E3 / Port").setDesc("\u672C\u5730 HTTP \u670D\u52A1\u7AEF\u53E3 / Local HTTP service port").addText(
      (text) => text.setPlaceholder("3000").setValue(String(this.plugin.settings.port)).onChange(async (value) => {
        const next = this.plugin.parsePositiveInt(
          value,
          this.plugin.settings.port,
          1,
          65535
        );
        if (next === this.plugin.settings.port) return;
        this.plugin.settings.port = next;
        await this.plugin.persistPluginData();
        await this.plugin.restartBridge();
      })
    );
    new import_obsidian.Setting(containerEl).setName("\u7B14\u8BB0\u76EE\u5F55 / Inbox Folder").setDesc("\u751F\u6210\u7684 memo \u6587\u4EF6\u5199\u5165\u76EE\u5F55 / Target folder for generated memo files").addText(
      (text) => text.setPlaceholder("Inbox").setValue(this.plugin.settings.inboxFolder).onChange(async (value) => {
        this.plugin.settings.inboxFolder = value.trim() || "Inbox";
        await this.plugin.persistPluginData();
      })
    );
    new import_obsidian.Setting(containerEl).setName("\u9644\u4EF6\u76EE\u5F55 / Attachments Folder").setDesc("\u56FE\u7247/\u89C6\u9891/\u6587\u4EF6\u7684\u5199\u5165\u76EE\u5F55 / Target folder for images/videos/files").addText(
      (text) => text.setPlaceholder("attachments").setValue(this.plugin.settings.attachmentsFolder).onChange(async (value) => {
        this.plugin.settings.attachmentsFolder = value.trim() || "attachments";
        await this.plugin.persistPluginData();
      })
    );
    new import_obsidian.Setting(containerEl).setName("\u5E7F\u64AD\u540D\u79F0 / Advertised Name").setDesc("mDNS \u81EA\u52A8\u53D1\u73B0\u663E\u793A\u7684\u670D\u52A1\u540D / Service name shown by mDNS discovery").addText(
      (text) => text.setPlaceholder(`MemoFlow-${os.hostname()}`).setValue(this.plugin.settings.advertisedName).onChange(async (value) => {
        this.plugin.settings.advertisedName = value.trim();
        await this.plugin.persistPluginData();
        this.plugin.startMdns();
      })
    );
    new import_obsidian.Setting(containerEl).setName("\u914D\u5BF9\u7801\u6709\u6548\u671F\uFF08\u79D2\uFF09 / Pair Code TTL (seconds)").setDesc("\u914D\u5BF9\u7801\u7684\u6709\u6548\u65F6\u957F / How long a pair code stays valid").addText(
      (text) => text.setPlaceholder("120").setValue(String(this.plugin.settings.pairCodeTtlSeconds)).onChange(async (value) => {
        const next = this.plugin.parsePositiveInt(
          value,
          this.plugin.settings.pairCodeTtlSeconds,
          30,
          86400
        );
        this.plugin.settings.pairCodeTtlSeconds = next;
        await this.plugin.persistPluginData();
      })
    );
    new import_obsidian.Setting(containerEl).setName("\u5355\u6587\u4EF6\u5927\u5C0F\u4E0A\u9650\uFF08MB\uFF09 / Max File Size (MB)").setDesc("\u5355\u4E2A\u9644\u4EF6\u5141\u8BB8\u7684\u6700\u5927\u4F53\u79EF / Single attachment max size").addText(
      (text) => text.setPlaceholder("200").setValue(String(this.plugin.settings.maxFileSizeMB)).onChange(async (value) => {
        const next = this.plugin.parsePositiveInt(
          value,
          this.plugin.settings.maxFileSizeMB,
          1,
          2048
        );
        this.plugin.settings.maxFileSizeMB = next;
        await this.plugin.persistPluginData();
      })
    );
    new import_obsidian.Setting(containerEl).setName("\u914D\u5BF9 / Pairing").setDesc("\u91CD\u7F6E\u914D\u5BF9\u7801\u6216\u5C55\u793A\u4E8C\u7EF4\u7801 / Regenerate pairing code or display a new QR").addButton(
      (button) => button.setButtonText("\u91CD\u7F6E / Regenerate").onClick(async () => {
        this.plugin.regeneratePairCode(true);
        await this.plugin.persistPluginData();
        this.display();
      })
    ).addButton(
      (button) => button.setButtonText("\u663E\u793A\u4E8C\u7EF4\u7801 / Show QR").setCta().onClick(() => {
        new PairQrModal(this.app, this.plugin).open();
      })
    );
  }
};
var PairQrModal = class extends import_obsidian.Modal {
  plugin;
  constructor(app, plugin) {
    super(app);
    this.plugin = plugin;
  }
  async onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    const pairUri = this.plugin.getPairUri();
    const pairCode = this.plugin.getCurrentPairCode();
    contentEl.createEl("h3", { text: "MemoFlow \u914D\u5BF9\u4E8C\u7EF4\u7801 / MemoFlow Pairing QR" });
    contentEl.createEl("p", {
      text: "\u8BF7\u4F7F\u7528 MemoFlow \u624B\u673A\u7AEF\u626B\u63CF\u5E76\u5B8C\u6210\u914D\u5BF9 / Use MemoFlow mobile app to scan and complete pairing."
    });
    try {
      const src = await import_qrcode.default.toDataURL(pairUri, {
        width: 280,
        margin: 1
      });
      contentEl.createEl("img", {
        attr: {
          src,
          alt: "MemoFlow Pairing QR",
          style: "display:block;margin:12px auto;max-width:280px;width:100%;border-radius:8px;"
        }
      });
    } catch (error) {
      contentEl.createEl("p", {
        text: `\u4E8C\u7EF4\u7801\u6E32\u67D3\u5931\u8D25 / QR render failed: ${String(error)}`
      });
    }
    const box = contentEl.createEl("textarea", {
      text: pairCode
    });
    box.rows = 1;
    box.readOnly = true;
    box.style.width = "100%";
    new import_obsidian.Setting(contentEl).setName("\u590D\u5236\u914D\u5BF9\u7801 / Copy Pair Code").addButton(
      (button) => button.setButtonText("\u590D\u5236 / Copy").setCta().onClick(async () => {
        try {
          await navigator.clipboard.writeText(pairCode);
          new import_obsidian.Notice("\u914D\u5BF9\u7801\u5DF2\u590D\u5236 / Pair code copied.");
        } catch (_) {
          new import_obsidian.Notice("\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u590D\u5236 / Copy failed. Please copy manually.");
        }
      })
    );
    contentEl.createEl("p", {
      text: "\u914D\u5BF9\u7801\u6709\u6548\u671F\u8F83\u77ED\uFF0C\u8FC7\u671F\u8BF7\u91CD\u7F6E / Pair code is short-lived. Regenerate if expired."
    });
  }
  onClose() {
    this.contentEl.empty();
  }
};
