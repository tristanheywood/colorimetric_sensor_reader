// source: types.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.ClipboardContent', null, global);
goog.exportSymbol('proto.PickStats', null, global);
goog.exportSymbol('proto.PickedCircle', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.PickStats = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.PickStats, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.PickStats.displayName = 'proto.PickStats';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ClipboardContent = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.ClipboardContent.repeatedFields_, null);
};
goog.inherits(proto.ClipboardContent, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.ClipboardContent.displayName = 'proto.ClipboardContent';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.PickedCircle = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.PickedCircle, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.PickedCircle.displayName = 'proto.PickedCircle';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.PickStats.prototype.toObject = function(opt_includeInstance) {
  return proto.PickStats.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.PickStats} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.PickStats.toObject = function(includeInstance, msg) {
  var f, obj = {
    mur: jspb.Message.getFloatingPointFieldWithDefault(msg, 1, 0.0),
    mug: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0),
    mub: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
    percr: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
    percg: jspb.Message.getFloatingPointFieldWithDefault(msg, 5, 0.0),
    percb: jspb.Message.getFloatingPointFieldWithDefault(msg, 6, 0.0),
    sigmar: jspb.Message.getFloatingPointFieldWithDefault(msg, 7, 0.0),
    sigmag: jspb.Message.getFloatingPointFieldWithDefault(msg, 8, 0.0),
    sigmab: jspb.Message.getFloatingPointFieldWithDefault(msg, 9, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.PickStats}
 */
proto.PickStats.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.PickStats;
  return proto.PickStats.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.PickStats} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.PickStats}
 */
proto.PickStats.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setMur(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setMug(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setMub(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setPercr(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setPercg(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setPercb(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setSigmar(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setSigmag(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setSigmab(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.PickStats.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.PickStats.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.PickStats} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.PickStats.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMur();
  if (f !== 0.0) {
    writer.writeDouble(
      1,
      f
    );
  }
  f = message.getMug();
  if (f !== 0.0) {
    writer.writeDouble(
      2,
      f
    );
  }
  f = message.getMub();
  if (f !== 0.0) {
    writer.writeDouble(
      3,
      f
    );
  }
  f = message.getPercr();
  if (f !== 0.0) {
    writer.writeDouble(
      4,
      f
    );
  }
  f = message.getPercg();
  if (f !== 0.0) {
    writer.writeDouble(
      5,
      f
    );
  }
  f = message.getPercb();
  if (f !== 0.0) {
    writer.writeDouble(
      6,
      f
    );
  }
  f = message.getSigmar();
  if (f !== 0.0) {
    writer.writeDouble(
      7,
      f
    );
  }
  f = message.getSigmag();
  if (f !== 0.0) {
    writer.writeDouble(
      8,
      f
    );
  }
  f = message.getSigmab();
  if (f !== 0.0) {
    writer.writeDouble(
      9,
      f
    );
  }
};


/**
 * optional double muR = 1;
 * @return {number}
 */
proto.PickStats.prototype.getMur = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 1, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.PickStats} returns this
 */
proto.PickStats.prototype.setMur = function(value) {
  return jspb.Message.setProto3FloatField(this, 1, value);
};


/**
 * optional double muG = 2;
 * @return {number}
 */
proto.PickStats.prototype.getMug = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.PickStats} returns this
 */
proto.PickStats.prototype.setMug = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};


/**
 * optional double muB = 3;
 * @return {number}
 */
proto.PickStats.prototype.getMub = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.PickStats} returns this
 */
proto.PickStats.prototype.setMub = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};


/**
 * optional double percR = 4;
 * @return {number}
 */
proto.PickStats.prototype.getPercr = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.PickStats} returns this
 */
proto.PickStats.prototype.setPercr = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};


/**
 * optional double percG = 5;
 * @return {number}
 */
proto.PickStats.prototype.getPercg = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 5, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.PickStats} returns this
 */
proto.PickStats.prototype.setPercg = function(value) {
  return jspb.Message.setProto3FloatField(this, 5, value);
};


/**
 * optional double percB = 6;
 * @return {number}
 */
proto.PickStats.prototype.getPercb = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 6, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.PickStats} returns this
 */
proto.PickStats.prototype.setPercb = function(value) {
  return jspb.Message.setProto3FloatField(this, 6, value);
};


/**
 * optional double sigmaR = 7;
 * @return {number}
 */
proto.PickStats.prototype.getSigmar = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 7, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.PickStats} returns this
 */
proto.PickStats.prototype.setSigmar = function(value) {
  return jspb.Message.setProto3FloatField(this, 7, value);
};


/**
 * optional double sigmaG = 8;
 * @return {number}
 */
proto.PickStats.prototype.getSigmag = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 8, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.PickStats} returns this
 */
proto.PickStats.prototype.setSigmag = function(value) {
  return jspb.Message.setProto3FloatField(this, 8, value);
};


/**
 * optional double sigmaB = 9;
 * @return {number}
 */
proto.PickStats.prototype.getSigmab = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 9, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.PickStats} returns this
 */
proto.PickStats.prototype.setSigmab = function(value) {
  return jspb.Message.setProto3FloatField(this, 9, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.ClipboardContent.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ClipboardContent.prototype.toObject = function(opt_includeInstance) {
  return proto.ClipboardContent.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ClipboardContent} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ClipboardContent.toObject = function(includeInstance, msg) {
  var f, obj = {
    rowsList: jspb.Message.toObjectList(msg.getRowsList(),
    proto.PickStats.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ClipboardContent}
 */
proto.ClipboardContent.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ClipboardContent;
  return proto.ClipboardContent.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ClipboardContent} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ClipboardContent}
 */
proto.ClipboardContent.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.PickStats;
      reader.readMessage(value,proto.PickStats.deserializeBinaryFromReader);
      msg.addRows(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ClipboardContent.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ClipboardContent.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ClipboardContent} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ClipboardContent.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRowsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.PickStats.serializeBinaryToWriter
    );
  }
};


/**
 * repeated PickStats rows = 1;
 * @return {!Array<!proto.PickStats>}
 */
proto.ClipboardContent.prototype.getRowsList = function() {
  return /** @type{!Array<!proto.PickStats>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.PickStats, 1));
};


/**
 * @param {!Array<!proto.PickStats>} value
 * @return {!proto.ClipboardContent} returns this
*/
proto.ClipboardContent.prototype.setRowsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.PickStats=} opt_value
 * @param {number=} opt_index
 * @return {!proto.PickStats}
 */
proto.ClipboardContent.prototype.addRows = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.PickStats, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.ClipboardContent} returns this
 */
proto.ClipboardContent.prototype.clearRowsList = function() {
  return this.setRowsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.PickedCircle.prototype.toObject = function(opt_includeInstance) {
  return proto.PickedCircle.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.PickedCircle} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.PickedCircle.toObject = function(includeInstance, msg) {
  var f, obj = {
    centerx: jspb.Message.getFloatingPointFieldWithDefault(msg, 1, 0.0),
    centery: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0),
    radius: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
    imgfilename: jspb.Message.getFieldWithDefault(msg, 4, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.PickedCircle}
 */
proto.PickedCircle.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.PickedCircle;
  return proto.PickedCircle.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.PickedCircle} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.PickedCircle}
 */
proto.PickedCircle.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setCenterx(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setCentery(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setRadius(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setImgfilename(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.PickedCircle.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.PickedCircle.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.PickedCircle} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.PickedCircle.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCenterx();
  if (f !== 0.0) {
    writer.writeDouble(
      1,
      f
    );
  }
  f = message.getCentery();
  if (f !== 0.0) {
    writer.writeDouble(
      2,
      f
    );
  }
  f = message.getRadius();
  if (f !== 0.0) {
    writer.writeDouble(
      3,
      f
    );
  }
  f = message.getImgfilename();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * optional double centerX = 1;
 * @return {number}
 */
proto.PickedCircle.prototype.getCenterx = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 1, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.PickedCircle} returns this
 */
proto.PickedCircle.prototype.setCenterx = function(value) {
  return jspb.Message.setProto3FloatField(this, 1, value);
};


/**
 * optional double centerY = 2;
 * @return {number}
 */
proto.PickedCircle.prototype.getCentery = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.PickedCircle} returns this
 */
proto.PickedCircle.prototype.setCentery = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};


/**
 * optional double radius = 3;
 * @return {number}
 */
proto.PickedCircle.prototype.getRadius = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.PickedCircle} returns this
 */
proto.PickedCircle.prototype.setRadius = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};


/**
 * optional string imgFileName = 4;
 * @return {string}
 */
proto.PickedCircle.prototype.getImgfilename = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.PickedCircle} returns this
 */
proto.PickedCircle.prototype.setImgfilename = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


goog.object.extend(exports, proto);