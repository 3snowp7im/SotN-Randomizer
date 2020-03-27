(function(self) {

  let constants
  if (self) {
    constants = self.sotnRando.constants
  } else {
    constants = require('./constants')
  }
  const ZONE = constants.ZONE
  const TYPE = constants.TYPE

  const items = [{
    name: 'Heart',
    type: TYPE.HEART,
    id: 0,
    tiles: [{
      zones: [ ZONE.ST0 ],
      entities: [ 0x26e0, 0x28de ],
      candle: 0x30,
    }, {
      zones: [ ZONE.ST0 ],
      entities: [ 0x26fe, 0x28e8 ],
      candle: 0x30,
    }, {
      zones: [ ZONE.ST0 ],
      entities: [ 0x2708, 0x28f2 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.ST0 ],
      entities: [ 0x2712, 0x28fc ],
      candle: 0x30,
    }, {
      zones: [ ZONE.ST0 ],
      entities: [ 0x2726, 0x2906 ],
      candle: 0x30,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x2f1e, 0x35ce ],
      candle: 0x10,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x2f5a, 0x35ec ],
      candle: 0x10,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x2f82, 0x3600 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x350e, 0x3b8c ],
      candle: 0x10,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x3518, 0x3b96 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x3072, 0x3704 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x3086, 0x36fa ],
      candle: 0x10,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x30a4, 0x36e6 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x30b8, 0x36dc ],
      candle: 0x10,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x33ce, 0x3a60 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x33e2, 0x39ca ],
      candle: 0x10,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x3400, 0x3aba ],
      candle: 0x10,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x3450, 0x3ad8 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x3266, 0x3966 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x3284, 0x38e4 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x32c0, 0x3952 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x32de, 0x38d0 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x31a8, 0x383a ],
      candle: 0x10,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x31bc, 0x3830 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x2dce, 0x36ae ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x2dd8, 0x36b8 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x2d7e, 0x365e ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x2d92, 0x3654 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x2e82, 0x3744 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x2cfc, 0x35d2 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x3044, 0x3938 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x306c, 0x3924 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x2c84, 0x3564 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x2c8e, 0x358c ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x30a8, 0x3a00 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x30bc, 0x3a0a ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x30ee, 0x39c4 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x30f8, 0x3a32 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x3134, 0x3a1e ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x313e, 0x3988 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x315c, 0x39b0 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x3166, 0x3a28 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x32e2, 0x3bf4 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x32ec, 0x3bfe ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x331e, 0x3c12 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x3328, 0x3c08 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x3382, 0x3c6c ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x3396, 0x3c62 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x33aa, 0x3c9e ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x33be, 0x3c8a ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x33e6, 0x3c76 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x3440, 0x3d16 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x344a, 0x3d0c ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CHI ],
      entities: [ 0x1b2e, 0x1ebc ],
      candle: 0x00,
    }, {
      zones: [ ZONE.CHI ],
      entities: [ 0x1b4c, 0x1eda ],
      candle: 0x10,
    }, {
      zones: [ ZONE.CHI ],
      entities: [ 0x1b88, 0x1f0c ],
      candle: 0x00,
    }, {
      zones: [ ZONE.CHI ],
      entities: [ 0x1bb0, 0x1f20 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.DAI ],
      entities: [ 0x2ad6, 0x3468 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.DAI ],
      entities: [ 0x2aea, 0x3472 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.DAI ],
      entities: [ 0x2b4e, 0x3490 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.DAI ],
      entities: [ 0x2c02, 0x3580 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.DAI ],
      entities: [ 0x2c3e, 0x3594 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.DAI ],
      entities: [ 0x2cac, 0x363e ],
      candle: 0x10,
    }, {
      zones: [ ZONE.DAI ],
      entities: [ 0x295a, 0x327e ],
      candle: 0x00,
    }, {
      zones: [ ZONE.DAI ],
      entities: [ 0x2d56, 0x379c ],
      candle: 0x00,
    }, {
      zones: [ ZONE.DAI ],
      entities: [ 0x2d60, 0x37e2 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.DAI ],
      entities: [ 0x2d6a, 0x380a ],
      candle: 0x00,
    }, {
      zones: [ ZONE.DAI ],
      entities: [ 0x2eb4, 0x3814 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.DAI ],
      entities: [ 0x2ebe, 0x3850 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.DAI ],
      entities: [ 0x306c, 0x39ea ],
      candle: 0x10,
    }, {
      zones: [ ZONE.LIB ],
      entities: [ 0x3722, 0x3ee8 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.LIB ],
      entities: [ 0x3768, 0x3e0c ],
      candle: 0x00,
    }, {
      zones: [ ZONE.LIB ],
      entities: [ 0x37a4, 0x3dc6 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.LIB ],
      entities: [ 0x37ea, 0x3e16 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.LIB ],
      entities: [ 0x37f4, 0x3e3e ],
      candle: 0x00,
    }, {
      zones: [ ZONE.LIB ],
      entities: [ 0x3812, 0x3e20 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.LIB ],
      entities: [ 0x3830, 0x3dbc ],
      candle: 0x00,
    }, {
      zones: [ ZONE.LIB ],
      entities: [ 0x386c, 0x3db2 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.LIB ],
      entities: [ 0x3628, 0x3cd6 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.LIB ],
      entities: [ 0x3650, 0x3ce0 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.LIB ],
      entities: [ 0x33e4, 0x3aba ],
      candle: 0x00,
    }, {
      zones: [ ZONE.LIB ],
      entities: [ 0x33f8, 0x3b5a ],
      candle: 0x00,
    }, {
      zones: [ ZONE.LIB ],
      entities: [ 0x3466, 0x3a4c ],
      candle: 0x00,
    }, {
      zones: [ ZONE.LIB ],
      entities: [ 0x3484, 0x3ae2 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.LIB ],
      entities: [ 0x3498, 0x3b78 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.LIB ],
      entities: [ 0x34d4, 0x3ad8 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.LIB ],
      entities: [ 0x34e8, 0x3b82 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.LIB ],
      entities: [ 0x36c8, 0x3d4e ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x2e32, 0x3e38 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x2e6e, 0x3e24 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x2e78, 0x3e1a ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x2eaa, 0x3e06 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x2eb4, 0x3cda ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x2ebe, 0x3dfc ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x2ed2, 0x3cd0 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x2efa, 0x3df2 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x2f04, 0x3cc6 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x2f18, 0x3de8 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x2f40, 0x3dd4 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x2f4a, 0x3cb2 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x2f5e, 0x3dca ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x2f7c, 0x3db6 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x2fa4, 0x3c94 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x2fc2, 0x3c8a ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x2ff4, 0x3e88 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x2ffe, 0x3e9c ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x3012, 0x3e6a ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x3026, 0x3e92 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x3030, 0x3ea6 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x3062, 0x3f8c ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x306c, 0x3faa ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x308a, 0x3ece ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x30a8, 0x3ed8 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x30bc, 0x3f28 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x30c6, 0x3f32 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x30d0, 0x3f6e ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x30da, 0x3fbe ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x30e4, 0x3ee2 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x30f8, 0x3f50 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x3102, 0x3eec ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x310c, 0x3f5a ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x3120, 0x3f78 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x312a, 0x3fc8 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x315c, 0x3f00 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x3184, 0x3f46 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x3198, 0x3fdc ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x3274, 0x40f4 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x3292, 0x4108 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x329c, 0x4112 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x32ba, 0x413a ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x32ce, 0x414e ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x32d8, 0x4158 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x32ec, 0x4162 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x32f6, 0x416c ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x35ee, 0x446e ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x362a, 0x4482 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x3332, 0x41b2 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x3378, 0x41c6 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x3418, 0x42c0 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x3436, 0x42d4 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x344a, 0x42e8 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x345e, 0x42f2 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x3468, 0x42fc ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x349a, 0x4306 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x34a4, 0x4310 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x34c2, 0x4324 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x34cc, 0x432e ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x34e0, 0x4338 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x293a, 0x37ba ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x294e, 0x37c4 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x33a0, 0x423e ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x33b4, 0x4220 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x31b6, 0x4068 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x31ca, 0x404a ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x31de, 0x40b8 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x3210, 0x40a4 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x322e, 0x4040 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x3238, 0x4090 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x36f2, 0x4568 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x36fc, 0x4586 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x353a, 0x43b0 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x3544, 0x43d8 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x3558, 0x43a6 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x3562, 0x4400 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x358a, 0x440a ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x359e, 0x43ba ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NO1 ],
      entities: [ 0x39b8, 0x4176 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NO1 ],
      entities: [ 0x3864, 0x407c ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NO1 ],
      entities: [ 0x3878, 0x3fc8 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NO1 ],
      entities: [ 0x3882, 0x4086 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NO1 ],
      entities: [ 0x38e6, 0x400e ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NO1 ],
      entities: [ 0x35ee, 0x3dde ],
      candle: 0x60,
    }, {
      zones: [ ZONE.NO1 ],
      entities: [ 0x360c, 0x3dca ],
      candle: 0x60,
    }, {
      zones: [ ZONE.NO1 ],
      entities: [ 0x3b5c, 0x440a ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NO1 ],
      entities: [ 0x3b66, 0x43b0 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NO1 ],
      entities: [ 0x3b70, 0x4342 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NO1 ],
      entities: [ 0x3c56, 0x42b6 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NO1 ],
      entities: [ 0x3c6a, 0x4298 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x39b6, 0x416a ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x3a24, 0x40e8 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x3a38, 0x414c ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x3a60, 0x4156 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x363c, 0x3d6e ],
      candle: 0x30,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x3650, 0x3d78 ],
      candle: 0x30,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x3678, 0x3d96 ],
      candle: 0x30,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x34fc, 0x3c56 ],
      candle: 0x40,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x3524, 0x3c42 ],
      candle: 0x40,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x3538, 0x3c38 ],
      candle: 0x40,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x3830, 0x3f9e ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x384e, 0x3fa8 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x38b2, 0x3fb2 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x38bc, 0x3f12 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x38ee, 0x402a ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x38f8, 0x3f08 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x359c, 0x3cce ],
      candle: 0x60,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x35b0, 0x3cd8 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x35ec, 0x3d28 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x3600, 0x3d32 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x36dc, 0x3e40 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x36fa, 0x3e0e ],
      candle: 0x40,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x3704, 0x3e04 ],
      candle: 0x40,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x3740, 0x3e68 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x374a, 0x3e5e ],
      candle: 0x60,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x377c, 0x3e4a ],
      candle: 0x60,
    }, {
      zones: [ ZONE.NO3, ZONE.NP3 ],
      entities: [ 0x43c2, 0x4b44, 0x419e, 0x48d0 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO3 ],
      entities: [ 0x43d6, 0x4b4e ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO3 ],
      entities: [ 0x43e0, 0x4b58 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO3 ],
      entities: [ 0x43fe, 0x4b62 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO3 ],
      entities: [ 0x4412, 0x4b6c ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO3 ],
      entities: [ 0x4430, 0x4b76 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO3, ZONE.NP3 ],
      entities: [ 0x3e18, 0x4590, 0x3bb8, 0x42e0 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO3, ZONE.NP3 ],
      entities: [ 0x3e22, 0x45ae, 0x3bc2, 0x42fe ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO3, ZONE.NP3 ],
      entities: [ 0x3e2c, 0x45a4, 0x3bcc, 0x42f4 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO3, ZONE.NP3 ],
      entities: [ 0x3eea, 0x468a, 0x3c94, 0x43da ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO3, ZONE.NP3 ],
      entities: [ 0x3efe, 0x4676, 0x3ca8, 0x43c6 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO3, ZONE.NP3 ],
      entities: [ 0x3f08, 0x466c, 0x3cbc, 0x43bc ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO3, ZONE.NP3 ],
      entities: [ 0x3e4a, 0x45d6, 0x3bea, 0x4326 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO3, ZONE.NP3 ],
      entities: [ 0x42a0, 0x4a90, 0x407c, 0x4826 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO3 ],
      entities: [ 0x42c8, 0x4a36 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO3 ],
      entities: [ 0x4354, 0x4a40 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO3, ZONE.NP3 ],
      entities: [ 0x4368, 0x4a86, 0x4144, 0x481c ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO3, ZONE.NP3 ],
      entities: [ 0x3f4e, 0x46e4, 0x3d0c, 0x4448 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO3, ZONE.NP3 ],
      entities: [ 0x3f62, 0x46ee, 0x3d20, 0x4452 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO3 ],
      entities: [ 0x3f76, 0x46f8 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO3, ZONE.NP3 ],
      entities: [ 0x3f80, 0x4720, 0x3d34, 0x4484 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO3 ],
      entities: [ 0x3f94, 0x472a ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO3, ZONE.NP3 ],
      entities: [ 0x3f9e, 0x4702, 0x3d48, 0x4466 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO3, ZONE.NP3 ],
      entities: [ 0x3fb2, 0x470c, 0x3d52, 0x4470 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO3, ZONE.NP3 ],
      entities: [ 0x3fc6, 0x4716, 0x3d66, 0x447a ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO3, ZONE.NP3 ],
      entities: [ 0x40fc, 0x487e, 0x3eba, 0x45e2 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO3, ZONE.NP3 ],
      entities: [ 0x4124, 0x48e2, 0x3eec, 0x465a ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO3, ZONE.NP3 ],
      entities: [ 0x414c, 0x48d8, 0x3f14, 0x4650 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3294, 0x4326 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x32b2, 0x4344 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3e10, 0x4e98 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x35dc, 0x4646 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x35e6, 0x4664 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x350a, 0x4600 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x351e, 0x456a ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3532, 0x457e ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3546, 0x45e2 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3578, 0x452e ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3582, 0x4542 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x342e, 0x44ac ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3442, 0x44b6 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x33fc, 0x448e ],
      candle: 0x60,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3460, 0x44fc ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3488, 0x44e8 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3370, 0x43f8 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3384, 0x4416 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x33a2, 0x4402 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3e1a, 0x4ea2 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3e74, 0x4ec0 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3ece, 0x4f56 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x4086, 0x50c8 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x4108, 0x50dc ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x411c, 0x50e6 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3fd2, 0x5064 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x369a, 0x4722 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3a78, 0x4b1e ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3b54, 0x4b00 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3b5e, 0x4b32 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3be0, 0x4c36 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3c08, 0x4c2c ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3d20, 0x4d30 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3de8, 0x4d4e ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3df2, 0x4d58 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x38a2, 0x48c6 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x38ac, 0x48bc ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3938, 0x49de ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x37e4, 0x475e ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x37ee, 0x4754 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2a78, 0x33c6 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2f8c, 0x38a8 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2f96, 0x38bc ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2fbe, 0x392a ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2fdc, 0x38f8 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2ffa, 0x3934 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x3022, 0x3902 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2ee2, 0x3826 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2f00, 0x381c ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x304a, 0x398e ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x3068, 0x3984 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2e10, 0x374a ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2e42, 0x3772 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x28de, 0x3204 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x28f2, 0x3236 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x29e2, 0x32fe ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2938, 0x3272 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x297e, 0x32a4 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x29d8, 0x32f4 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x29ec, 0x3312 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2a1e, 0x3380 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2a46, 0x336c ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2ce4, 0x363c ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2d48, 0x3628 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2d52, 0x3632 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2abe, 0x3434 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2b22, 0x3470 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2b36, 0x345c ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2b9a, 0x34e8 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2c08, 0x3524 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x30ae, 0x39fc ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x30b8, 0x39f2 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x30c2, 0x3a06 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x30d6, 0x3a1a ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2d40, 0x3792 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2d5e, 0x3756 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2d72, 0x374c ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2d7c, 0x377e ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2d0e, 0x371a ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2d22, 0x3724 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2bba, 0x3648 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2be2, 0x36d4 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2c0a, 0x362a ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2c1e, 0x36c0 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2c50, 0x36b6 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2c82, 0x3698 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2cbe, 0x367a ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2ce6, 0x3620 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x24bc, 0x2f4a ],
      candle: 0x40,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x24c6, 0x2fa4 ],
      candle: 0x40,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2660, 0x30a8 ],
      candle: 0x40,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x26ec, 0x315c ],
      candle: 0x40,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x26f6, 0x3148 ],
      candle: 0x40,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x28d6, 0x3454 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2980, 0x354e ],
      candle: 0x60,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x299e, 0x338c ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x29b2, 0x33b4 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2a16, 0x33aa ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2a3e, 0x3378 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2a48, 0x3418 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2a70, 0x353a ],
      candle: 0x60,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2a8e, 0x336e ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2aa2, 0x3396 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.TOP ],
      entities: [ 0x2106, 0x28a6 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.TOP ],
      entities: [ 0x214c, 0x28b0 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.TOP ],
      entities: [ 0x217e, 0x28c4 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.TOP ],
      entities: [ 0x2188, 0x28ce ],
      candle: 0x60,
    }, {
      zones: [ ZONE.TOP ],
      entities: [ 0x21a6, 0x275c ],
      candle: 0x30,
    }, {
      zones: [ ZONE.TOP ],
      entities: [ 0x21e2, 0x2766 ],
      candle: 0x30,
    }, {
      zones: [ ZONE.TOP ],
      entities: [ 0x21ec, 0x28e2 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.TOP ],
      entities: [ 0x2200, 0x2770 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.TOP ],
      entities: [ 0x2214, 0x28ec ],
      candle: 0x60,
    }, {
      zones: [ ZONE.TOP ],
      entities: [ 0x2228, 0x277a ],
      candle: 0x30,
    }, {
      zones: [ ZONE.TOP ],
      entities: [ 0x223c, 0x2900 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.TOP ],
      entities: [ 0x225a, 0x290a ],
      candle: 0x60,
    }, {
      zones: [ ZONE.TOP ],
      entities: [ 0x2264, 0x27ca ],
      candle: 0x60,
    }, {
      zones: [ ZONE.TOP ],
      entities: [ 0x226e, 0x2784 ],
      candle: 0x30,
    }, {
      zones: [ ZONE.TOP ],
      entities: [ 0x22be, 0x291e ],
      candle: 0x60,
    }, {
      zones: [ ZONE.TOP ],
      entities: [ 0x22f0, 0x2860 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.TOP ],
      entities: [ 0x2390, 0x284c ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x2464, 0x2a36 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x248c, 0x2a22 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x24be, 0x2a04 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x209a, 0x264e ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x20a4, 0x2644 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x1fa0, 0x2536 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x1faa, 0x2540 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x1ff0, 0x2554 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x1ffa, 0x255e ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x223e, 0x289c ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x2248, 0x27f2 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x2324, 0x28e2 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x237e, 0x28c4 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x2194, 0x2784 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x21bc, 0x270c ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x21e4, 0x2798 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x21f8, 0x2720 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x2108, 0x269e ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x211c, 0x26a8 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x27ee, 0x331c ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x27f8, 0x3312 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x27c6, 0x32ea ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x27d0, 0x32f4 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x2b4a, 0x3696 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x2762, 0x3286 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x2ab4, 0x35f6 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x2adc, 0x35e2 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x2726, 0x31dc ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x2730, 0x325e ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x28b6, 0x3402 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x28c0, 0x3434 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x28ca, 0x3470 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x28d4, 0x33f8 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x2906, 0x33c6 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x291a, 0x3448 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x2924, 0x33e4 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x2938, 0x33da ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x2d5c, 0x388a ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x2d7a, 0x3894 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x2db6, 0x3880 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x2dc0, 0x3876 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x2df2, 0x390c ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x2e56, 0x3920 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x2ee2, 0x3934 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x2f3c, 0x393e ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x2fa0, 0x3948 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x3018, 0x3b3c ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x3022, 0x3b46 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCHI ],
      entities: [ 0x1974, 0x1dca ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RCHI ],
      entities: [ 0x19ba, 0x1df2 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RCHI ],
      entities: [ 0x19e2, 0x1e42 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RCHI ],
      entities: [ 0x1a1e, 0x1e56 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RDAI ],
      entities: [ 0x206c, 0x2a0a ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RDAI ],
      entities: [ 0x20bc, 0x29ec ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RDAI ],
      entities: [ 0x20da, 0x29e2 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RDAI ],
      entities: [ 0x213e, 0x2abe ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RDAI ],
      entities: [ 0x2166, 0x2aaa ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RDAI ],
      entities: [ 0x21de, 0x2b36 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RDAI ],
      entities: [ 0x1ee6, 0x292e ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RDAI ],
      entities: [ 0x226a, 0x2c3a ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RDAI ],
      entities: [ 0x2274, 0x2be0 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RDAI ],
      entities: [ 0x23e6, 0x2cda ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RDAI ],
      entities: [ 0x23f0, 0x2c8a ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RDAI ],
      entities: [ 0x23fa, 0x2c30 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RDAI ],
      entities: [ 0x2512, 0x2e60 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RLIB ],
      entities: [ 0x1b50, 0x2212 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RLIB ],
      entities: [ 0x1b96, 0x221c ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RLIB ],
      entities: [ 0x1baa, 0x21b8 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RLIB ],
      entities: [ 0x1bc8, 0x21a4 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RLIB ],
      entities: [ 0x1bd2, 0x2172 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RLIB ],
      entities: [ 0x1bf0, 0x21f4 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RLIB ],
      entities: [ 0x1c18, 0x21ae ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RLIB ],
      entities: [ 0x1c86, 0x20f0 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RLIB ],
      entities: [ 0x1ed4, 0x249c ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RLIB ],
      entities: [ 0x1ef2, 0x2492 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RLIB ],
      entities: [ 0x1f56, 0x2500 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RLIB ],
      entities: [ 0x1d1c, 0x2316 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RLIB ],
      entities: [ 0x1d4e, 0x2366 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RLIB ],
      entities: [ 0x1d76, 0x230c ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RLIB ],
      entities: [ 0x1d80, 0x2370 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RLIB ],
      entities: [ 0x1d94, 0x23d4 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RLIB ],
      entities: [ 0x1e02, 0x22ee ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RLIB ],
      entities: [ 0x1e3e, 0x23c0 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RLIB ],
      entities: [ 0x1e70, 0x2424 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x371c, 0x4948 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3744, 0x4952 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3758, 0x477c ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x37bc, 0x48e4 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x37c6, 0x4790 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x37e4, 0x479a ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x383e, 0x47ae ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x385c, 0x47b8 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3884, 0x4902 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x38a2, 0x48f8 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x38d4, 0x490c ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x38de, 0x47c2 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x391a, 0x47cc ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x396a, 0x47e0 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x397e, 0x47ea ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3668, 0x4722 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3672, 0x4704 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x367c, 0x46f0 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3686, 0x46dc ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x36ae, 0x46fa ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x36b8, 0x46e6 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x39ce, 0x4aba ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x39e2, 0x4a38 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x39ec, 0x4b14 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3a28, 0x4a7e ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3a32, 0x4a4c ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3a3c, 0x4a9c ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3a46, 0x4b00 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3a50, 0x4aa6 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3a5a, 0x4af6 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3a78, 0x4ac4 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3a82, 0x4a74 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3a8c, 0x4a42 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3aa0, 0x4ace ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3aaa, 0x4aec ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3ac8, 0x4ae2 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3adc, 0x4a6a ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3ae6, 0x4a56 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x362c, 0x4696 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3636, 0x468c ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3b22, 0x4ba0 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3b40, 0x4b96 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3b72, 0x4b8c ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3b86, 0x4b82 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3b9a, 0x4b6e ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x4428, 0x54ce ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x445a, 0x54ba ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x40e0, 0x5154 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x4158, 0x5140 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x42a2, 0x52f8 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x42ca, 0x530c ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x42f2, 0x5320 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x4306, 0x532a ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x431a, 0x5334 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x4360, 0x533e ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x436a, 0x5348 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x43a6, 0x535c ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x43c4, 0x5366 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x43d8, 0x5370 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x36e0, 0x4754 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x36f4, 0x474a ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x4072, 0x50e6 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x4086, 0x50f0 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x40a4, 0x50dc ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x4194, 0x528a ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x419e, 0x521c ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x41c6, 0x51f4 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x4216, 0x523a ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x4220, 0x51ea ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x422a, 0x5276 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x4248, 0x5262 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x4518, 0x5596 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x4522, 0x558c ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x452c, 0x55a0 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x4536, 0x5582 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3fa0, 0x5014 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3fb4, 0x5050 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3fc8, 0x500a ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3ffa, 0x5000 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x4004, 0x505a ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x402c, 0x503c ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x4036, 0x5046 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x404a, 0x501e ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO1 ],
      entities: [ 0x2012, 0x2780 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNO1 ],
      entities: [ 0x203a, 0x27da ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNO1 ],
      entities: [ 0x2044, 0x26f4 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNO1 ],
      entities: [ 0x20bc, 0x26ea ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNO1 ],
      entities: [ 0x2260, 0x2942 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RNO1 ],
      entities: [ 0x2288, 0x2956 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RNO1 ],
      entities: [ 0x23dc, 0x2c58 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNO1 ],
      entities: [ 0x23e6, 0x2c1c ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNO1 ],
      entities: [ 0x245e, 0x2ad2 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNO1 ],
      entities: [ 0x2468, 0x2b36 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNO1 ],
      entities: [ 0x2472, 0x2b90 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x2484, 0x2c7c ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x2498, 0x2c72 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x24ca, 0x2cc2 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x24de, 0x2cb8 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x24f2, 0x2d1c ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x2538, 0x2cd6 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x2574, 0x2d6c ],
      candle: 0x30,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x25a6, 0x2d4e ],
      candle: 0x30,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x25c4, 0x2d44 ],
      candle: 0x30,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x2614, 0x2de4 ],
      candle: 0x40,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x2628, 0x2dee ],
      candle: 0x40,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x2650, 0x2e02 ],
      candle: 0x40,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x2718, 0x3096 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x2786, 0x30a0 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x2a60, 0x323a ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x2a6a, 0x3230 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x2a9c, 0x3280 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x2ab0, 0x3276 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x2aec, 0x32c6 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x2b3c, 0x32da ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x2b46, 0x32e4 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x2baa, 0x332a ],
      candle: 0x40,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x2bbe, 0x3334 ],
      candle: 0x40,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x2bd2, 0x3302 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x3106, 0x3818 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x3156, 0x3804 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x31ba, 0x37f0 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x31ce, 0x37e6 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x2c7e, 0x334a ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x2c88, 0x335e ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x2c92, 0x3372 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x320a, 0x38cc ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x321e, 0x38d6 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x3250, 0x38ea ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x2cc4, 0x3390 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x2efe, 0x35e8 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x2f08, 0x362e ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x2f3a, 0x3624 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x2f44, 0x35d4 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x3034, 0x3746 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x3052, 0x373c ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x3084, 0x3732 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x30b6, 0x371e ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x30ca, 0x3714 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x2c4c, 0x3318 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x2c56, 0x3322 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x2c60, 0x332c ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x2e2c, 0x34f8 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x2e4a, 0x3502 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x2e86, 0x3552 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x3b50, 0x4aa0 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x3b64, 0x4ab4 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x3010, 0x3f88 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x301a, 0x3f60 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x3024, 0x3f7e ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x2f34, 0x3f24 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x2f48, 0x3eb6 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x2f8e, 0x3f10 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x2fac, 0x3efc ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x2fd4, 0x3ea2 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x2e9e, 0x3e16 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x2ebc, 0x3e0c ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x2e26, 0x3d6c ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x2ee4, 0x3e34 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x2f16, 0x3e48 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x2d90, 0x3d26 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x2dcc, 0x3cea ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x2dea, 0x3d1c ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x3696, 0x462c ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x36f0, 0x4640 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x36fa, 0x4636 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x38f8, 0x48ca ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x390c, 0x48c0 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x3966, 0x48ac ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x384e, 0x4794 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x3c0e, 0x4b54 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x322c, 0x417c ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x3240, 0x4172 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x3286, 0x4226 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x32a4, 0x4244 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x3358, 0x4212 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x338a, 0x4398 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x339e, 0x438e ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x3588, 0x4460 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x361e, 0x45aa ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x3632, 0x45b4 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x30ba, 0x4104 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x30c4, 0x40fa ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x2372, 0x2c5c ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x2728, 0x3026 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x2732, 0x303a ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x2778, 0x30b2 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x27a0, 0x306c ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x27b4, 0x30a8 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x27d2, 0x3062 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x26a6, 0x2fa4 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x26c4, 0x2f9a ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x2890, 0x3184 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x28ae, 0x318e ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x27fa, 0x30f8 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x2818, 0x30ee ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x25fc, 0x2ed2 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x2624, 0x2ee6 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x2192, 0x2a7c ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x21a6, 0x2a4a ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x21f6, 0x2acc ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x2200, 0x2ac2 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x2232, 0x2b12 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x2296, 0x2ba8 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x22a0, 0x2b94 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x22aa, 0x2b6c ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x22fa, 0x2bf8 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x2318, 0x2c02 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x2520, 0x2e3c ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x2534, 0x2e32 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x25a2, 0x2e46 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x239a, 0x2c84 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x23ae, 0x2c98 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x2408, 0x2cca ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x244e, 0x2d56 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x24b2, 0x2d88 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x2836, 0x312a ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x2854, 0x313e ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x285e, 0x3148 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x2868, 0x3134 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2d42, 0x35aa ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2d4c, 0x35dc ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2d60, 0x35e6 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2d7e, 0x35be ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2cfc, 0x356e ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2d10, 0x3564 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2b8a, 0x34b0 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2b9e, 0x342e ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2c20, 0x344c ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2c66, 0x346a ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2c7a, 0x3474 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2cac, 0x34ba ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2cb6, 0x3488 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2cd4, 0x349c ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x26ee, 0x2e66 ],
      candle: 0x40,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2716, 0x2ec0 ],
      candle: 0x40,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x281a, 0x2ff6 ],
      candle: 0x40,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2932, 0x3140 ],
      candle: 0x40,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x293c, 0x3154 ],
      candle: 0x40,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2a9a, 0x338e ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2acc, 0x3334 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2b08, 0x337a ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2b58, 0x330c ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RTOP ],
      entities: [ 0x1ad2, 0x1fbe ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RTOP ],
      entities: [ 0x1ae6, 0x1fb4 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RTOP ],
      entities: [ 0x1af0, 0x1faa ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RTOP ],
      entities: [ 0x1b04, 0x1fa0 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RTOP ],
      entities: [ 0x1b22, 0x1f96 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RTOP ],
      entities: [ 0x1b4a, 0x1f8c ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RTOP ],
      entities: [ 0x1b86, 0x2090 ],
      candle: 0x30,
    }, {
      zones: [ ZONE.RTOP ],
      entities: [ 0x1b90, 0x1f82 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RTOP ],
      entities: [ 0x1ba4, 0x1f78 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RTOP ],
      entities: [ 0x1bb8, 0x2086 ],
      candle: 0x30,
    }, {
      zones: [ ZONE.RTOP ],
      entities: [ 0x1bc2, 0x1f6e ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RTOP ],
      entities: [ 0x1bcc, 0x1f64 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RTOP ],
      entities: [ 0x1be0, 0x207c ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RTOP ],
      entities: [ 0x1bea, 0x1f5a ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RTOP ],
      entities: [ 0x1bfe, 0x2072 ],
      candle: 0x30,
    }, {
      zones: [ ZONE.RTOP ],
      entities: [ 0x1c08, 0x1f50 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RTOP ],
      entities: [ 0x1c1c, 0x2068 ],
      candle: 0x30,
    }, {
      zones: [ ZONE.RTOP ],
      entities: [ 0x1c30, 0x1f46 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RTOP ],
      entities: [ 0x1c3a, 0x1f3c ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RTOP ],
      entities: [ 0x1c44, 0x1f32 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RTOP ],
      entities: [ 0x1c62, 0x1f28 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RTOP ],
      entities: [ 0x1c9e, 0x1f1e ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RTOP ],
      entities: [ 0x1ca8, 0x1f14 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RTOP ],
      entities: [ 0x1cb2, 0x1f0a ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RTOP ],
      entities: [ 0x1cd0, 0x1f00 ],
      candle: 0x60,
    }],
  }, {
    name: 'Big heart',
    type: TYPE.HEART,
    id: 1,
    tiles: [{
      zones: [ ZONE.ST0 ],
      entities: [ 0x27da, 0x296a ],
      candle: 0x30,
    }, {
      zones: [ ZONE.ST0 ],
      entities: [ 0x2834, 0x2974 ],
      candle: 0x30,
    }, {
      zones: [ ZONE.ST0 ],
      entities: [ 0x27bc, 0x294c ],
      candle: 0x30,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x2f32, 0x35d8 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x3068, 0x370e ],
      candle: 0x10,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x3360, 0x3a4c ],
      candle: 0x10,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x337e, 0x39c0 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x325c, 0x38ee ],
      candle: 0x10,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x31da, 0x3826 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x2d2e, 0x35fa ],
      candle: 0x10,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x2d56, 0x360e ],
      candle: 0x00,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x2db0, 0x367c ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x2e8c, 0x374e ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x349a, 0x3d8e ],
      candle: 0x00,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x3076, 0x392e ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x2ca2, 0x35a0 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x3116, 0x3a3c ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x312a, 0x39ba ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x330a, 0x3bcc ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x33b4, 0x3c94 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x3436, 0x3d20 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CHI ],
      entities: [ 0x1b24, 0x1eb2 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.CHI ],
      entities: [ 0x1b92, 0x1ef8 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.CHI ],
      entities: [ 0x1ba6, 0x1f02 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.CHI ],
      entities: [ 0x1bce, 0x1f70 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.DAI ],
      entities: [ 0x2c2a, 0x358a ],
      candle: 0x10,
    }, {
      zones: [ ZONE.DAI ],
      entities: [ 0x2c84, 0x3634 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.DAI ],
      entities: [ 0x29c8, 0x3350 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.DAI ],
      entities: [ 0x287e, 0x3210 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.DAI ],
      entities: [ 0x2888, 0x321a ],
      candle: 0x10,
    }, {
      zones: [ ZONE.DAI ],
      entities: [ 0x2892, 0x3224 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.DAI ],
      entities: [ 0x27a2, 0x312a ],
      candle: 0x10,
    }, {
      zones: [ ZONE.DAI ],
      entities: [ 0x27ac, 0x3134 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.DAI ],
      entities: [ 0x28c4, 0x330a ],
      candle: 0x00,
    }, {
      zones: [ ZONE.DAI ],
      entities: [ 0x2e28, 0x3832 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.DAI ],
      entities: [ 0x2e3c, 0x37d8 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.LIB ],
      entities: [ 0x374a, 0x3dd0 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.LIB ],
      entities: [ 0x3772, 0x3e48 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.LIB ],
      entities: [ 0x3420, 0x3b64 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.LIB ],
      entities: [ 0x3452, 0x3aec ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x2e8c, 0x3e10 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x2f36, 0x3cbc ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x2f68, 0x3dc0 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x2fae, 0x3d8e ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x2fea, 0x3e74 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x3008, 0x3eb0 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x30ee, 0x3f3c ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x3148, 0x3ef6 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x318e, 0x3f64 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x32c4, 0x4144 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x330a, 0x4176 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x3620, 0x4478 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x3382, 0x41d0 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x3440, 0x42de ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x34b8, 0x431a ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x2dc4, 0x3c58 ],
      candle: 0x80,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x2de2, 0x3c62 ],
      candle: 0x80,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x33c8, 0x422a ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x3206, 0x4036 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x3224, 0x407c ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x3706, 0x4572 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x3530, 0x43e2 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO1 ],
      entities: [ 0x394a, 0x4112 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NO1 ],
      entities: [ 0x385a, 0x3fbe ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NO1 ],
      entities: [ 0x3576, 0x3d52 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NO1 ],
      entities: [ 0x35b2, 0x3d70 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NO1 ],
      entities: [ 0x3b48, 0x42ca ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x3a9c, 0x41b0 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x39e8, 0x40de ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x3664, 0x3d8c ],
      candle: 0x30,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x3560, 0x3c2e ],
      candle: 0x40,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x37ea, 0x3ecc ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x381c, 0x400c ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x388a, 0x3ef4 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x3916, 0x4034 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x3722, 0x3e72 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.NO3, ZONE.NP3 ],
      entities: [ 0x3eb8, 0x4644, 0x3c58, 0x4394 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO3, ZONE.NP3 ],
      entities: [ 0x3e0e, 0x459a, 0x3bae, 0x42ea ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO3, ZONE.NP3 ],
      entities: [ 0x3ef4, 0x4680, 0x3c9e, 0x43d0 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO3, ZONE.NP3 ],
      entities: [ 0x42e6, 0x4a7c, 0x40b8, 0x4812 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO3, ZONE.NP3 ],
      entities: [ 0x412e, 0x48b0, 0x3ef6, 0x4614 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x32da, 0x4358 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x35c8, 0x465a ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x34ce, 0x454c ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x34d8, 0x45a6 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3438, 0x44c0 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x33c0, 0x4466 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x33f2, 0x4484 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x338e, 0x4420 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3e24, 0x4eac ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x36a4, 0x472c ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3afa, 0x4b28 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3bb8, 0x4aec ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2f64, 0x38da ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x3004, 0x393e ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2924, 0x325e ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2a3c, 0x3362 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2d7a, 0x3650 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2b4a, 0x340c ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2bfe, 0x3510 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2bec, 0x3634 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2c64, 0x36ac ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2ca0, 0x3684 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2cf0, 0x35d0 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2782, 0x3152 ],
      candle: 0x40,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x282c, 0x321a ],
      candle: 0x40,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2976, 0x3508 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x29ee, 0x3544 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2a5c, 0x33a0 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2aac, 0x3404 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.TOP ],
      entities: [ 0x23f4, 0x29aa ],
      candle: 0x30,
    }, {
      zones: [ ZONE.TOP ],
      entities: [ 0x216a, 0x28ba ],
      candle: 0x60,
    }, {
      zones: [ ZONE.TOP ],
      entities: [ 0x22aa, 0x2914 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.TOP ],
      entities: [ 0x2318, 0x2856 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.TOP ],
      entities: [ 0x2322, 0x2694 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.TOP ],
      entities: [ 0x2598, 0x2b58 ],
      candle: 0x30,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x24aa, 0x2a0e ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x2004, 0x2568 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x2298, 0x2892 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x22b6, 0x27de ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x21ee, 0x27a2 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x20f4, 0x2694 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x278a, 0x32b8 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x2794, 0x32c2 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x27bc, 0x32e0 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x2b40, 0x36a0 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x2ca8, 0x37c2 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x2aaa, 0x3600 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x26cc, 0x31be ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x28de, 0x343e ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x28f2, 0x33d0 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x2d84, 0x38c6 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x2ea6, 0x392a ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x302c, 0x3b50 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCHI ],
      entities: [ 0x19b0, 0x1e06 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RCHI ],
      entities: [ 0x19f6, 0x1e60 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RCHI ],
      entities: [ 0x1a14, 0x1e6a ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RCHI ],
      entities: [ 0x1ac8, 0x1f46 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RDAI ],
      entities: [ 0x2152, 0x2ab4 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RDAI ],
      entities: [ 0x21f2, 0x2b2c ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RDAI ],
      entities: [ 0x25d0, 0x2f28 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RDAI ],
      entities: [ 0x1e1e, 0x278a ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RDAI ],
      entities: [ 0x1e28, 0x276c ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RDAI ],
      entities: [ 0x1e32, 0x2762 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RDAI ],
      entities: [ 0x1d2e, 0x2690 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RDAI ],
      entities: [ 0x1d38, 0x2686 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RDAI ],
      entities: [ 0x1fcc, 0x27c6 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RDAI ],
      entities: [ 0x233c, 0x2bea ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RDAI ],
      entities: [ 0x2350, 0x2c94 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RLIB ],
      entities: [ 0x1c22, 0x217c ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RLIB ],
      entities: [ 0x1c4a, 0x21fe ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RLIB ],
      entities: [ 0x1dbc, 0x237a ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RLIB ],
      entities: [ 0x1dd0, 0x22f8 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3726, 0x488a ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3780, 0x4786 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x37da, 0x48ee ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3942, 0x47d6 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x36a4, 0x470e ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x36c2, 0x46d2 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x39d8, 0x4a88 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3a14, 0x4b0a ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3a64, 0x4ab0 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3b2c, 0x4baa ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3b90, 0x4b78 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x4432, 0x54c4 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x40d6, 0x515e ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x42de, 0x5316 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x4388, 0x5352 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x35e6, 0x465a ],
      candle: 0x80,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3604, 0x4664 ],
      candle: 0x80,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x41b2, 0x5226 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x41bc, 0x5280 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO1 ],
      entities: [ 0x212a, 0x2820 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNO1 ],
      entities: [ 0x20b2, 0x27d0 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNO1 ],
      entities: [ 0x22ce, 0x29c4 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNO1 ],
      entities: [ 0x2300, 0x29e2 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNO1 ],
      entities: [ 0x24e0, 0x2bea ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x248e, 0x2c86 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x251a, 0x2d12 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x2588, 0x2d62 ],
      candle: 0x30,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x2600, 0x2dda ],
      candle: 0x40,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x26c8, 0x2f06 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x272c, 0x2efc ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x275e, 0x2f56 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x2772, 0x2f4c ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x279a, 0x2ef2 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x27e0, 0x30d2 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x2826, 0x2f42 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x2844, 0x2f38 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x2876, 0x2ede ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x28da, 0x2ed4 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x28ee, 0x30dc ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x2b64, 0x32ee ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x2fee, 0x36a6 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x2ff8, 0x369c ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x312e, 0x380e ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x2d1e, 0x33f4 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x2ca6, 0x3368 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x3232, 0x38e0 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x2f30, 0x35de ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x2e40, 0x353e ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x3b3c, 0x4a96 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x302e, 0x3f6a ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x2fde, 0x3f2e ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x2fe8, 0x3ed4 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x2ea8, 0x3e02 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x2e1c, 0x3d76 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x2e76, 0x3d9e ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x2db8, 0x3cf4 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x36e6, 0x464a ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x3c04, 0x4b5e ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x3254, 0x4262 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x32fe, 0x421c ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x275a, 0x301c ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x278c, 0x3076 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x21ec, 0x2ad6 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x230e, 0x2c0c ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x250c, 0x2e28 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x23c2, 0x2ce8 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x2444, 0x2d74 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2b76, 0x350a ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2bda, 0x3438 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2c48, 0x3460 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2cc0, 0x34c4 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x28a6, 0x314a ],
      candle: 0x40,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x295a, 0x31d6 ],
      candle: 0x40,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2aa4, 0x3320 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2ac2, 0x3384 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2b30, 0x32e4 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RTOP ],
      entities: [ 0x1d70, 0x21b2 ],
      candle: 0x30,
    }],
  }, {
    name: '$1',
    type: TYPE.GOLD,
    id: 2,
    tiles: [{
      zones: [ ZONE.CAT ],
      entities: [ 0x2e0a, 0x36ea ],
      candle: 0x10,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x30b2, 0x397e ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x33f0, 0x3c58 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CHI ],
      entities: [ 0x1b9c, 0x1f16 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.LIB ],
      entities: [ 0x35f6, 0x3c90 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x2e82, 0x3d16 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x2ea0, 0x3d20 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x2ec8, 0x3d2a ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x2edc, 0x3d34 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x2f2c, 0x3d48 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x2f54, 0x3d52 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x2f72, 0x3d5c ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x3a2e, 0x40f2 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x37fe, 0x4002 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO3, ZONE.NP3 ],
      entities: [ 0x3e04, 0x45b8, 0x3ba4, 0x4308 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO3, ZONE.NP3 ],
      entities: [ 0x40f2, 0x48ec, 0x3eb0, 0x4664 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x33ca, 0x4470 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x33d4, 0x447a ],
      candle: 0x60,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x33de, 0x445c ],
      candle: 0x60,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x33e8, 0x4452 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3fe6, 0x505a ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2d02, 0x368c ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2bf4, 0x34fc ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2d90, 0x3774 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x29f8, 0x3382 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x283e, 0x3362 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x2942, 0x3466 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x2de8, 0x3952 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCHI ],
      entities: [ 0x1a00, 0x1e4c ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RLIB ],
      entities: [ 0x1f2e, 0x250a ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x376c, 0x48da ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x37b2, 0x48d0 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x37f8, 0x48c6 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x387a, 0x48b2 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x38ac, 0x48a8 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3906, 0x489e ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3956, 0x4894 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x24e8, 0x2d26 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x2c9c, 0x3354 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x2e90, 0x34ee ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x2e30, 0x3db2 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x2e4e, 0x3dbc ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x2e62, 0x3d94 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x2e80, 0x3d8a ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x383a, 0x479e ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x2584, 0x2df6 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x243a, 0x2d7e ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2d2e, 0x35a0 ],
      candle: 0x10,
    }],
  }, {
    name: '$25',
    type: TYPE.GOLD,
    id: 3,
    tiles: [{
      zones: [ ZONE.ARE ],
      entities: [ 0x2f78, 0x35f6 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x3356, 0x39b6 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x3414, 0x3ac4 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x3432, 0x3ace ],
      candle: 0x10,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x32ac, 0x38da ],
      candle: 0x10,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x2cf2, 0x35dc ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x2cca, 0x3596 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x30c6, 0x39ce ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x30e4, 0x3a14 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CHI ],
      entities: [ 0x1b42, 0x1ed0 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.CHI ],
      entities: [ 0x1d04, 0x206a ],
      candle: 0x00,
    }, {
      zones: [ ZONE.DAI ],
      entities: [ 0x2b08, 0x347c ],
      candle: 0x10,
    }, {
      zones: [ ZONE.DAI ],
      entities: [ 0x2cd4, 0x3648 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.DAI ],
      entities: [ 0x2914, 0x32ce ],
      candle: 0x00,
    }, {
      zones: [ ZONE.LIB ],
      entities: [ 0x354c, 0x3c04 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.LIB ],
      entities: [ 0x3416, 0x3ab0 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.LIB ],
      entities: [ 0x3696, 0x3d62 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x2e96, 0x3ce4 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x2f22, 0x3dde ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x3314, 0x4180 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x3422, 0x42ca ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x3710, 0x457c ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x354e, 0x43f6 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO1 ],
      entities: [ 0x3602, 0x3dd4 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.NO1 ],
      entities: [ 0x3a44, 0x43ec ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NO1 ],
      entities: [ 0x3c42, 0x4324 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x3880, 0x3f1c ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x35ba, 0x3ce2 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x36d2, 0x3e36 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x3768, 0x3e54 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.NO3, ZONE.NP3 ],
      entities: [ 0x3ee0, 0x4694, 0x3c80, 0x43e4 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x35d2, 0x4650 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3e6a, 0x4eb6 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x409a, 0x50d2 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2a96, 0x33bc ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2fd2, 0x390c ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2e06, 0x3786 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2988, 0x32ae ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2d0c, 0x3646 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2d16, 0x3696 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2ae6, 0x342a ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2b2c, 0x3466 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2b40, 0x3416 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2c12, 0x3538 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2d54, 0x3788 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2c14, 0x36ca ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2cdc, 0x3670 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x29bc, 0x3422 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2a84, 0x340e ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x22ac, 0x2888 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x2338, 0x28d8 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x2360, 0x28ce ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x21d0, 0x278e ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x279e, 0x32ae ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x276c, 0x3290 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x2636, 0x31d2 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x2910, 0x33ee ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x292e, 0x3452 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCHI ],
      entities: [ 0x19a6, 0x1dc0 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RDAI ],
      entities: [ 0x21ca, 0x2b40 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RLIB ],
      entities: [ 0x1df8, 0x23b6 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RLIB ],
      entities: [ 0x1e98, 0x2438 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3b04, 0x4bb4 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x42b6, 0x5302 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x4338, 0x5398 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x400e, 0x4ff6 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO1 ],
      entities: [ 0x2274, 0x294c ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RNO1 ],
      entities: [ 0x23fa, 0x2bcc ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x27d6, 0x30aa ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x2a56, 0x3244 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x2b0a, 0x32d0 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x3264, 0x38f4 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x3006, 0x3f74 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x36a0, 0x4622 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x393e, 0x48b6 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x2354, 0x2c52 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x273c, 0x3030 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x27c8, 0x308a ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x23ea, 0x2cc0 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2b80, 0x3424 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2ca2, 0x347e ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2ab8, 0x332a ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2b1c, 0x333e ],
      candle: 0x50,
    }],
  }, {
    name: '$50',
    type: TYPE.GOLD,
    id: 4,
    tiles: [{
      zones: [ ZONE.ARE ],
      entities: [ 0x2f50, 0x35e2 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x3522, 0x3baa ],
      candle: 0x10,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x309a, 0x36f0 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x304e, 0x3942 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x3300, 0x3bc2 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CHI ],
      entities: [ 0x1b56, 0x1ea8 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.DAI ],
      entities: [ 0x2f4a, 0x3904 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x31d4, 0x4072 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO1 ],
      entities: [ 0x3968, 0x411c ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x39c0, 0x40d4 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x3510, 0x3c4c ],
      candle: 0x40,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x38da, 0x3fbc ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x3902, 0x3efe ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO3, ZONE.NP3 ],
      entities: [ 0x3de6, 0x4572, 0x3b86, 0x42c2 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x32d0, 0x4330 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3398, 0x442a ],
      candle: 0x60,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3b0e, 0x4b14 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2f82, 0x38c6 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x28e8, 0x320e ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2a5a, 0x3376 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2ba4, 0x34d4 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x30cc, 0x3a10 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2c32, 0x35c6 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2c6e, 0x36a2 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2994, 0x34fe ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x2478, 0x2a2c ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x2090, 0x2630 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x1fdc, 0x254a ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x2ad2, 0x35ec ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x262c, 0x3268 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x2d8e, 0x38bc ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCHI ],
      entities: [ 0x196a, 0x1e1a ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RCHI ],
      entities: [ 0x1a6e, 0x1ee2 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RDAI ],
      entities: [ 0x209e, 0x29f6 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RDAI ],
      entities: [ 0x1f7c, 0x2816 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RLIB ],
      entities: [ 0x1ab0, 0x2046 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x380c, 0x47a4 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO1 ],
      entities: [ 0x259e, 0x2ae6 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x24a2, 0x2c68 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x2632, 0x2df8 ],
      candle: 0x40,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x283a, 0x30b4 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x2bdc, 0x32f8 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x2c42, 0x330e ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x3b46, 0x4aaa ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x2da4, 0x3cfe ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x32f4, 0x4230 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x261a, 0x2ebe ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x219c, 0x2a72 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x223c, 0x2b08 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x2336, 0x2bee ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x2570, 0x2e50 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x23a4, 0x2c8e ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x23b8, 0x2cde ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x24bc, 0x2da6 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x2840, 0x3120 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2c3e, 0x3456 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2c70, 0x3514 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2b26, 0x32da ],
      candle: 0x50,
    }],
  }, {
    name: '$100',
    type: TYPE.GOLD,
    id: 5,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      addresses: [ 0x0b6c04 ],
      enemy: 5,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x3374, 0x3a56 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x328e, 0x395c ],
      candle: 0x10,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x2d38, 0x3622 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x2cd4, 0x356e ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x33d2, 0x3c80 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CHI ],
      entities: [ 0x1c14, 0x1f7a ],
      candle: 0x00,
    }, {
      zones: [ ZONE.DAI ],
      entities: [ 0x2e32, 0x3800 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.LIB ],
      entities: [ 0x372c, 0x3dda ],
      candle: 0x00,
    }, {
      zones: [ ZONE.LIB ],
      entities: [ 0x34b6, 0x3a56 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x301c, 0x3e7e ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO1 ],
      entities: [ 0x386e, 0x4072 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NO1 ],
      entities: [ 0x3a76, 0x42d4 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x365a, 0x3d82 ],
      candle: 0x30,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x3858, 0x3f26 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x386c, 0x4016 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3280, 0x436c ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3b36, 0x4af6 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2fe6, 0x3916 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2b90, 0x3542 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2c78, 0x35f8 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2cd2, 0x35bc ],
      candle: 0x10,
    }, {
      zones: [ ZONE.TOP ],
      entities: [ 0x221e, 0x28f6 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x24a0, 0x2a18 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x22a2, 0x27e8 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x21da, 0x2716 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x2e1a, 0x3916 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCHI ],
      entities: [ 0x1bb8, 0x1fb4 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RDAI ],
      entities: [ 0x2486, 0x2db6 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RLIB ],
      entities: [ 0x1c72, 0x2208 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RLIB ],
      entities: [ 0x1d62, 0x23de ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3910, 0x4916 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO1 ],
      entities: [ 0x2120, 0x282a ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNO1 ],
      entities: [ 0x204e, 0x271c ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNO1 ],
      entities: [ 0x258a, 0x2bf4 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x259c, 0x2d58 ],
      candle: 0x30,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x2722, 0x30c8 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x3192, 0x37fa ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x30a2, 0x3728 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x3b6e, 0x4a8c ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x32c2, 0x423a ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x2552, 0x2e00 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x2458, 0x2d4c ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2d6a, 0x35b4 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2b94, 0x3532 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2c2a, 0x34f6 ],
      candle: 0x10,
    }],
  }, {
    name: '$250',
    type: TYPE.GOLD,
    id: 6,
    tiles: [{
      zones: [ ZONE.CAT ],
      entities: [ 0x309e, 0x399c ],
      candle: 0x10,
    }, {
      zones: [ ZONE.DAI ],
      entities: [ 0x2e46, 0x377e ],
      candle: 0x10,
    }, {
      zones: [ ZONE.LIB ],
      entities: [ 0x381c, 0x3ede ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x2f0e, 0x3d3e ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x3486, 0x428e ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x358c, 0x4592 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x392e, 0x48b2 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2822, 0x31f2 ],
      candle: 0x40,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x294c, 0x345c ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RDAI ],
      entities: [ 0x2346, 0x2c44 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RLIB ],
      entities: [ 0x1ba0, 0x2118 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3834, 0x48bc ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3640, 0x46aa ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x364a, 0x46a0 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x252e, 0x2d08 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x2f3e, 0x3ee8 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x3592, 0x45a0 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x27aa, 0x3094 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2964, 0x31e0 ],
      candle: 0x40,
    }],
  }, {
    name: '$400',
    type: TYPE.GOLD,
    id: 7,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      addresses: [ 0x0b7464 ],
      enemy: 19,
    }, {
      addresses: [ 0x0b6e34 ],
      enemy: 25,
    }, {
      addresses: [ 0x0b6bb4 ],
      enemy: 32,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x328a, 0x4376 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.TOP ],
      entities: [ 0x230e, 0x269e ],
      candle: 0x60,
    }, {
      zones: [ ZONE.TOP ],
      entities: [ 0x239a, 0x27c0 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RDAI ],
      entities: [ 0x235a, 0x2ce4 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x2fe4, 0x36b0 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x3b78, 0x4a82 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x24a8, 0x2d2e ],
      candle: 0x20,
    }],
  }, {
    name: '$1000',
    type: TYPE.GOLD,
    id: 9,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      addresses: [ 0x0b83cc ],
      enemy: 40,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x318a, 0x3844 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x2130, 0x26b2 ],
      candle: 0x10,
    }],
  }, {
    name: '$2000',
    type: TYPE.GOLD,
    id: 10,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      addresses: [ 0x0b859c ],
      enemy: 50,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x38de, 0x48e4 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x35e2, 0x455a ],
      candle: 0x00,
    }],
  }, {
    name: 'Dagger',
    type: TYPE.SUBWEAPON,
    id: 14,
    tiles: [{
      zones: [ ZONE.RNZ0 ],
      addresses: [ 0x04f883c4 ],
      noOffset: true,
      tank: true,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x3158, 0x3790 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x2fb8, 0x3d98 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x327e, 0x40fe ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO1 ],
      entities: [ 0x37ec, 0x4018 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x34f2, 0x3c60 ],
      candle: 0x40,
    }, {
      zones: [ ZONE.NO3, ZONE.NP3 ],
      entities: [ 0x3eae, 0x463a, 0x3c4e, 0x438a ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3424, 0x44ca ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x29f6, 0x331c ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2c96, 0x368e ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2714, 0x30f8 ],
      candle: 0x40,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x2040, 0x25ea ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3730, 0x4812 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO1 ],
      entities: [ 0x20e4, 0x2762 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x265a, 0x2e0c ],
      candle: 0x40,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x2d32, 0x33ea ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x2ec6, 0x3dee ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x22b4, 0x2b62 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2be4, 0x3442 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2914, 0x31a4 ],
      candle: 0x40,
    }],
  }, {
    name: 'Axe',
    type: TYPE.SUBWEAPON,
    id: 15,
    tiles: [{
      zones: [ ZONE.NZ0 ],
      addresses: [ 0x054b372c ],
      noOffset: true,
      tank: true,
    }, {
      zones: [ ZONE.RNZ0 ],
      addresses: [ 0x04f883d0 ],
      noOffset: true,
      tank: true,
    }, {
      addresses: [ 0x0b83a4 ],
      enemy: 12,
    }, {
      addresses: [ 0x0b5964 ],
      enemy: 30,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x30e0, 0x3772 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x3490, 0x3d84 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.CHI ],
      entities: [ 0x1c0a, 0x1f5c ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x34ea, 0x4342 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x389e, 0x4020 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3528, 0x45ba ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x28d4, 0x31f0 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x28cc, 0x359e ],
      candle: 0x50,
    }, {
      zones: [ ZONE.TOP ],
      entities: [ 0x232c, 0x2676 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x2072, 0x25cc ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x2cb2, 0x37d6 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RCHI ],
      entities: [ 0x1ab4, 0x2004 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x43f6, 0x537a ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x2812, 0x2ee8 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x308e, 0x370a ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x2f98, 0x3eca ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x2188, 0x2a90 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2a5e, 0x3398 ],
      candle: 0x50,
    }],
  }, {
    name: 'Cross',
    type: TYPE.SUBWEAPON,
    id: 16,
    tiles: [{
      zones: [ ZONE.NZ0 ],
      addresses: [ 0x054b371c ],
      noOffset: true,
      tank: true,
    }, {
      zones: [ ZONE.RNZ0 ],
      addresses: [ 0x04f883c0 ],
      noOffset: true,
      tank: true,
    }, {
      zones: [ ZONE.ST0 ],
      entities: [ 0x2762, 0x28a2 ],
      candle: 0x30,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2b92, 0x33be ],
      candle: 0x00,
    }, {
      zones: [ ZONE.TOP ],
      entities: [ 0x22c8, 0x273e ],
      candle: 0x30,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x2f80, 0x36ba ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x2ef8, 0x3e3e ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x2de0, 0x3ce0 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RTOP ],
      entities: [ 0x1b18, 0x20cc ],
      candle: 0x30,
    }],
  }, {
    name: 'Holy Water',
    type: TYPE.SUBWEAPON,
    id: 17,
    tiles: [{
      zones: [ ZONE.RNZ0 ],
      addresses: [ 0x04f883d4 ],
      noOffset: true,
      tank: true,
    }, {
      zones: [ ZONE.ST0 ],
      entities: [ 0x26d6, 0x28d4 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x3130, 0x3786 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.CHI ],
      entities: [ 0x1b38, 0x1ec6 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x2e3c, 0x3e2e ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x35e4, 0x4464 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x370e, 0x3dfa ],
      candle: 0x40,
    }, {
      zones: [ ZONE.NO3, ZONE.NP3 ],
      entities: [ 0x3ed6, 0x4662, 0x3c76, 0x43b2 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3474, 0x44f2 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2f6e, 0x38d0 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2520, 0x2e82 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x25d4, 0x3062 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x26b0, 0x303a ],
      candle: 0x60,
    }, {
      zones: [ ZONE.TOP ],
      entities: [ 0x2192, 0x2752 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x2054, 0x25e0 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RCHI ],
      entities: [ 0x19c4, 0x1dde ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x3988, 0x47f4 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x4464, 0x54b0 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x2b82, 0x3320 ],
      candle: 0x40,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x3296, 0x38fe ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x2750, 0x3012 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x26d0, 0x2fa6 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x278e, 0x308c ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2860, 0x3050 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RTOP ],
      entities: [ 0x1c26, 0x205e ],
      candle: 0x20,
    }],
  }, {
    name: 'Stopwatch',
    type: TYPE.SUBWEAPON,
    id: 18,
    tiles: [{
      zones: [ ZONE.RNZ0 ],
      addresses: [ 0x04f883d8 ],
      noOffset: true,
      tank: true,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x2cb6, 0x35aa ],
      candle: 0x20,
    }, {
      zones: [ ZONE.LIB ],
      entities: [ 0x3736, 0x3ef2 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x333c, 0x41bc ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x39f2, 0x4160 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO3, ZONE.NP3 ],
      entities: [ 0x4340, 0x4a72, 0x4112, 0x4808 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO4 ],
      entities: [ 0x337a, 0x440c ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x2686, 0x31c8 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RLIB ],
      entities: [ 0x1c5e, 0x20fa ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x414e, 0x514a ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x2510, 0x2ccc ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO3 ],
      entities: [ 0x2f12, 0x35f2 ],
      candle: 0x00,
    }],
  }, {
    name: 'Bible',
    type: TYPE.SUBWEAPON,
    id: 19,
    tiles: [{
      zones: [ ZONE.NZ0 ],
      addresses: [ 0x054b3724 ],
      noOffset: true,
      tank: true,
    }, {
      zones: [ ZONE.RNZ0 ],
      addresses: [ 0x04f883c8 ],
      noOffset: true,
      tank: true,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x2c66, 0x3546 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.DAI ],
      entities: [ 0x2b1c, 0x3486 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x3350, 0x41da ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NO1 ],
      entities: [ 0x39ea, 0x41b2 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.NO2 ],
      entities: [ 0x3808, 0x3f30 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x25fa, 0x3128 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RDAI ],
      entities: [ 0x208a, 0x2a00 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x4112, 0x5136 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNO1 ],
      entities: [ 0x1fae, 0x2686 ],
      candle: 0x50,
    }, {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x28c6, 0x30be ],
      candle: 0x00,
    }],
  }, {
    name: 'Rebound Stone',
    type: TYPE.SUBWEAPON,
    id: 20,
    tiles: [{
      zones: [ ZONE.NZ0 ],
      addresses: [ 0x054b3718 ],
      noOffset: true,
      tank: true,
    }, {
      zones: [ ZONE.RNZ0 ],
      addresses: [ 0x04f883bc ],
      noOffset: true,
      tank: true,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x3108, 0x377c ],
      candle: 0x10,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x2c5c, 0x353c ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x3332, 0x3bd6 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.CHI ],
      entities: [ 0x1bd8, 0x1f8e ],
      candle: 0x00,
    }, {
      zones: [ ZONE.NO0 ],
      entities: [ 0x31c0, 0x40ae ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x3018, 0x3920 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x28e0, 0x331e ],
      candle: 0x50,
    }, {
      zones: [ ZONE.TOP ],
      entities: [ 0x21ba, 0x28d8 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x2068, 0x25d6 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x2604, 0x311e ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x2d52, 0x38b2 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RCHI ],
      entities: [ 0x1bae, 0x1f0a ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RNO0 ],
      entities: [ 0x4252, 0x51e0 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x2782, 0x309e ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2a68, 0x32f8 ],
      candle: 0x50,
    }],
  }, {
    name: 'Vibhuti',
    type: TYPE.SUBWEAPON,
    id: 21,
    tiles: [{
      zones: [ ZONE.RNZ0 ],
      addresses: [ 0x04f883cc ],
      noOffset: true,
      tank: true,
    }, {
      zones: [ ZONE.CAT ],
      entities: [ 0x3170, 0x39ec ],
      candle: 0x00,
    }, {
      zones: [ ZONE.DAI ],
      entities: [ 0x2fa4, 0x3954 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x2c1c, 0x354c ],
      candle: 0x20,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2494, 0x2f0e ],
      candle: 0x60,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x25de, 0x306c ],
      candle: 0x60,
    }, {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x26a6, 0x3012 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RCAT ],
      entities: [ 0x28ac, 0x340c ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RDAI ],
      entities: [ 0x2454, 0x2d84 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RNZ0 ],
      entities: [ 0x2462, 0x2d38 ],
      candle: 0x20,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2720, 0x2f10 ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x2784, 0x30aa ],
      candle: 0x60,
    }, {
      zones: [ ZONE.RNZ1 ],
      entities: [ 0x286a, 0x303c ],
      candle: 0x60,
    }],
  }, {
    name: 'Agunea',
    type: TYPE.SUBWEAPON,
    id: 22,
    tiles: [{
      zones: [ ZONE.NZ0 ],
      addresses: [ 0x054b3714 ],
      noOffset: true,
      tank: true,
    }, {
      zones: [ ZONE.RNZ0 ],
      addresses: [ 0x04f883b8 ],
      noOffset: true,
      tank: true,
    }, {
      zones: [ ZONE.ARE ],
      entities: [ 0x3504, 0x3b82 ],
      candle: 0x10,
    }, {
      zones: [ ZONE.RARE ],
      entities: [ 0x20cc, 0x263a ],
      candle: 0x10,
    }],
  }, {
    name: 'Heart Vessel',
    type: TYPE.POWERUP,
    id: 12,
    blacklist: [ 0x049d3674, 0x049d3676 ],
    tiles: [{
      zones: [ ZONE.NO2 ],
      index: 1,
      entities: [ 0x3718, 0x3e7c ],
    }, {
      zones: [ ZONE.NO3, ZONE.NP3 ],
      index: 0,
      entities: [ 0x3e68, 0x45f4, 0x3c08, 0x4344 ],
    }, {
      zones: [ ZONE.NO3, ZONE.NP3 ],
      index: 7,
      entities: [ 0x4066, 0x47f2, 0x3e1a, 0x4556 ],
    }, {
      zones: [ ZONE.NZ0 ],
      index: 1,
      entities: [ 0x2eec, 0x3844 ],
    }, {
      zones: [ ZONE.TOP ],
      index: 15,
      entities: [ 0x25f2, 0x2b8a ],
    }, {
      zones: [ ZONE.TOP ],
      index: 16,
      entities: [ 0x25de, 0x2b9e ],
    }, {
      zones: [ ZONE.TOP ],
      index: 18,
      entities: [ 0x2250, 0x2748 ],
    }, {
      zones: [ ZONE.NZ1 ],
      index: 11,
      entities: [ 0x2458, 0x2e64 ],
    }, {
      zones: [ ZONE.NO1 ],
      index: 2,
      entities: [ 0x3a30, 0x4248 ],
    }, {
      zones: [ ZONE.NO0 ],
      index: 2,
      entities: [ 0x367a, 0x44fa ],
    }, {
      zones: [ ZONE.NO0 ],
      index: 9,
      entities: [ 0x36ca, 0x454a ],
    }, {
      zones: [ ZONE.NO4 ],
      index: 0,
      entities: [ 0x3316, 0x439e ],
    }, {
      zones: [ ZONE.NO4 ],
      index: 0,
      entities: [ 0x380c, 0x4ace ],
    }, {
      zones: [ ZONE.NO4 ],
      index: 29,
      entities: [ 0x4176, 0x5208 ],
    }, {
      zones: [ ZONE.CAT ],
      index: 6,
      entities: [ 0x2ea0, 0x3730 ],
    }, {
      zones: [ ZONE.CAT ],
      index: 10,
      entities: [ 0x31a2, 0x3a82 ],
    }, {
      zones: [ ZONE.ARE ],
      index: 0,
      entities: [ 0x3162, 0x3768 ],
    }, {
      zones: [ ZONE.RTOP ],
      index: 6,
      entities: [ 0x1d52, 0x2176 ],
    }, {
      zones: [ ZONE.RTOP ],
      index: 8,
      entities: [ 0x1d34, 0x218a ],
    }, {
      zones: [ ZONE.RTOP ],
      index: 10,
      entities: [ 0x1d20, 0x219e ],
    }, {
      zones: [ ZONE.RNZ1 ],
      index: 10,
      entities: [ 0x25e0, 0x2e2a ],
    }, {
      zones: [ ZONE.RNO1 ],
      index: 0,
      entities: [ 0x2058, 0x26fe ],
    }, {
      zones: [ ZONE.RNO0 ],
      index: 4,
      entities: [ 0x3bb8, 0x4c18 ],
    }, {
      zones: [ ZONE.RNO4 ],
      index: 7,
      entities: [ 0x31dc, 0x4154 ],
    }, {
      zones: [ ZONE.RNO4 ],
      index: 15,
      entities: [ 0x2e12, 0x3dc6 ],
    }, {
      zones: [ ZONE.RCAT ],
      index: 10,
      entities: [ 0x2974, 0x348e ],
    }, {
      zones: [ ZONE.RCAT ],
      index: 15,
      entities: [ 0x2816, 0x333a ],
    }, {
      zones: [ ZONE.RNO3 ],
      index: 3,
      entities: [ 0x2e5e, 0x3566 ],
    }, {
      zones: [ ZONE.RNZ0 ],
      index: 1,
      entities: [ 0x26b0, 0x2f7c ],
    }, {
      zones: [ ZONE.RDAI ],
      index: 5,
      entities: [ 0x1fae, 0x27e4 ],
    }, {
      zones: [ ZONE.RDAI ],
      index: 17,
      entities: [ 0x25a8, 0x2f00 ],
    }, {
      zones: [ ZONE.RARE ],
      index: 5,
      entities: [ 0x219e, 0x27ac ],
    }, {
      zones: [ ZONE.RARE ],
      index: 7,
      entities: [ 0x21b2, 0x27c0 ],
    }],
  }, {
    name: 'Life Vessel',
    type: TYPE.POWERUP,
    id: 23,
    blacklist: [ 0x049d3674, 0x049d3676 ],
    tiles: [{
      zones: [ ZONE.NO3, ZONE.NP3 ],
      index: 1,
      entities: [ 0x3e86, 0x4612, 0x3c26, 0x4362 ],
    }, {
      zones: [ ZONE.NO3, ZONE.NP3 ],
      index: 6,
      entities: [ 0x4228, 0x49b4, 0x400e, 0x474a ],
    }, {
      zones: [ ZONE.NO3, ZONE.NP3 ],
      index: 8,
      entities: [ 0x41ec, 0x491e, 0x3fd2, 0x4696 ],
    }, {
      zones: [ ZONE.NZ0 ],
      index: 3,
      entities: [ 0x2a28, 0x338a ],
    }, {
      zones: [ ZONE.DAI ],
      index: 12,
      entities: [ 0x2d9c, 0x36ca ],
    }, {
      zones: [ ZONE.TOP ],
      index: 13,
      entities: [ 0x25d4, 0x2b80 ],
    }, {
      zones: [ ZONE.TOP ],
      index: 14,
      entities: [ 0x25e8, 0x2b94 ],
    }, {
      zones: [ ZONE.NZ1 ],
      index: 10,
      entities: [ 0x243a, 0x2e5a ],
    }, {
      zones: [ ZONE.NO1 ],
      index: 5,
      entities: [ 0x3a94, 0x4252 ],
    }, {
      zones: [ ZONE.NO0 ],
      index: 0,
      entities: [ 0x3652, 0x44d2 ],
    }, {
      zones: [ ZONE.NO0 ],
      index: 8,
      entities: [ 0x36c0, 0x4540 ],
    }, {
      zones: [ ZONE.NO4 ],
      index: 1,
      entities: [ 0x3334, 0x43bc ],
    }, {
      zones: [ ZONE.NO4 ],
      index: 28,
      entities: [ 0x4130, 0x51fe ],
    }, {
      zones: [ ZONE.NO4 ],
      index: 6,
      entities: [ 0x3f6e, 0x5000 ],
    }, {
      zones: [ ZONE.NO4 ],
      index: 5,
      entities: [ 0x3a64, 0x4cea ],
    }, {
      zones: [ ZONE.NO4 ],
      index: 24,
      entities: [ 0x3cee, 0x4e70 ],
    }, {
      zones: [ ZONE.CAT ],
      index: 9,
      entities: [ 0x3198, 0x3a78 ],
    }, {
      zones: [ ZONE.RTOP ],
      index: 9,
      entities: [ 0x1d2a, 0x2194 ],
    }, {
      zones: [ ZONE.RTOP ],
      index: 7,
      entities: [ 0x1d48, 0x2180 ],
    }, {
      zones: [ ZONE.RTOP ],
      index: 5,
      entities: [ 0x1d5c, 0x216c ],
    }, {
      zones: [ ZONE.RNZ1 ],
      index: 9,
      entities: [ 0x25c2, 0x2e34 ],
    }, {
      zones: [ ZONE.RNO1 ],
      index: 3,
      entities: [ 0x25bc, 0x2c94 ],
    }, {
      zones: [ ZONE.RNO0 ],
      index: 3,
      entities: [ 0x3c1c, 0x4c22 ],
    }, {
      zones: [ ZONE.RNO4 ],
      index: 12,
      entities: [ 0x3b96, 0x4af0 ],
    }, {
      zones: [ ZONE.RNO4 ],
      index: 6,
      entities: [ 0x336c, 0x4122 ],
    }, {
      zones: [ ZONE.RCAT ],
      index: 16,
      entities: [ 0x2820, 0x3344 ],
    }, {
      zones: [ ZONE.RCAT ],
      index: 9,
      entities: [ 0x296a, 0x3498 ],
    }, {
      zones: [ ZONE.RNO3 ],
      index: 8,
      entities: [ 0x2ce2, 0x33ae ],
    }, {
      zones: [ ZONE.RNZ0 ],
      index: 2,
      entities: [ 0x26f6, 0x2fc2 ],
    }, {
      zones: [ ZONE.RDAI ],
      index: 12,
      entities: [ 0x23be, 0x2d52 ],
    }, {
      zones: [ ZONE.RNO2 ],
      index: 8,
      entities: [ 0x2b78, 0x33c0 ],
    }, {
      zones: [ ZONE.RARE ],
      index: 6,
      entities: [ 0x21a8, 0x27b6 ],
    }],
  }, {
    name: 'Monster Vial 1',
    type: TYPE.USABLE,
    id: 1,
    tiles: [{
      addresses: [ 0x0b5caa ],
      enemy: 6,
    }, {
      addresses: [ 0x0b5cfa ],
      enemy: 10,
    }],
  }, {
    name: 'Monster Vial 2',
    type: TYPE.USABLE,
    id: 2,
    tiles: [{
      addresses: [ 0x0b63a2 ],
      enemy: 3,
    }],
  }, {
    name: 'Monster Vial 3',
    type: TYPE.USABLE,
    id: 3,
    tiles: [{
      zones: [ ZONE.CAT ],
      index: 17,
      entities: [ 0x3206, 0x3ae6 ],
    }, {
      zones: [ ZONE.CAT ],
      index: 18,
      entities: [ 0x321a, 0x3afa ],
    }, {
      zones: [ ZONE.CAT ],
      index: 19,
      entities: [ 0x3224, 0x3b04 ],
    }, {
      zones: [ ZONE.CAT ],
      index: 20,
      entities: [ 0x3238, 0x3b18 ],
    }, {
      addresses: [ 0x0b655a ],
      enemy: 7,
    }, {
      addresses: [ 0x0b60ac ],
      enemy: 76,
    }, {
      addresses: [ 0x0b6d94 ],
      enemy: 102,
    }, {
      addresses: [ 0x0b6e84 ],
      enemy: 113,
    }],
  }, {
    name: 'Shield Rod',
    type: TYPE.WEAPON1,
    id: 4,
    tiles: [{
      zones: [ ZONE.ARE ],
      index: 1,
      entities: [ 0x3180, 0x3808 ],
    }, {
      zones: [ ZONE.ST0 ],
      entities: [ 0x2816, 0x29b0 ],
      candle: 0x80,
    }],
  }, {
    name: 'Leather Shield',
    type: TYPE.SHIELD,
    id: 5,
    tiles: [{
      zones: [ ZONE.NZ0 ],
      index: 8,
      entities: [ 0x2cf8, 0x36b4 ],
    }, {
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a3166 ],
      shop: true,
    }, {
      addresses: [ 0x0b77d4 ],
      enemy: 14,
    }, {
      addresses: [ 0x0b66ec ],
      enemy: 29,
    }],
  }, {
    name: 'Knight Shield',
    type: TYPE.SHIELD,
    id: 6,
    tiles: [{
      zones: [ ZONE.ARE ],
      index: 4,
      entities: [ 0x34e6, 0x3ba0 ],
    }, {
      addresses: [ 0x0b77d2 ],
      enemy: 14,
    }],
  }, {
    name: 'Iron Shield',
    type: TYPE.SHIELD,
    id: 7,
    tiles: [{
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a316e ],
      shop: true,
    }, {
      addresses: [ 0x0b6ed4 ],
      enemy: 41,
    }],
  }, {
    name: 'AxeLord Shield',
    type: TYPE.SHIELD,
    id: 8,
    tiles: [{
      addresses: [ 0x0b5962 ],
      enemy: 30,
    }],
  }, {
    name: 'Herald Shield',
    type: TYPE.SHIELD,
    id: 9,
    tiles: [{
      zones: [ ZONE.NO4 ],
      index: 7,
      entities: [ 0x3fa0, 0x503c ],
    }],
  }, {
    name: 'Dark Shield',
    type: TYPE.SHIELD,
    id: 10,
    tiles: [{
      addresses: [ 0x0b8214 ],
      enemy: 126,
    }, {
      zones: [ ZONE.ST0 ],
      entities: [ 0x27f8, 0x2992 ],
      candle: 0x80,
    }],
  }, {
    name: 'Goddess Shield',
    type: TYPE.SHIELD,
    id: 11,
    tiles: [{
      zones: [ ZONE.RNZ0 ],
      index: 3,
      entities: [ 0x289a, 0x3166 ],
    }],
  }, {
    name: 'Shaman Shield',
    type: TYPE.SHIELD,
    id: 12,
    tiles: [{
      zones: [ ZONE.NZ1 ],
      index: 8,
      entities: [ 0x29c6, 0x33d2 ],
    }],
  }, {
    name: 'Medusa Shield',
    type: TYPE.SHIELD,
    id: 13,
    tiles: [{
      addresses: [ 0x0b8eea ],
      enemy: 24,
    }, {
      addresses: [ 0x0b8f12 ],
      enemy: 27,
    }],
  }, {
    name: 'Skull Shield',
    type: TYPE.SHIELD,
    id: 14,
    tiles: [{
      addresses: [ 0x0b872a ],
      enemy: 51,
    }, {
      addresses: [ 0x0b60aa ],
      enemy: 76,
    }, {
      addresses: [ 0x0b6d92 ],
      enemy: 102,
    }],
  }, {
    name: 'Fire Shield',
    type: TYPE.SHIELD,
    id: 15,
    tiles: [{
      addresses: [ 0x0b65fc ],
      enemy: 124,
    }],
  }, {
    name: 'Alucard Shield',
    type: TYPE.SHIELD,
    id: 16,
    tiles: [{
      zones: [ ZONE.RNO4 ],
      index: 0,
      entities: [ 0x3880, 0x47da ],
    }],
  }, {
    name: 'Sword of Dawn',
    type: TYPE.WEAPON2,
    id: 17,
    tiles: [{
      zones: [ ZONE.RTOP ],
      index: 0,
      entities: [ 0x1c76, 0x2040 ],
    }],
  }, {
    name: 'Basilard',
    type: TYPE.WEAPON1,
    id: 18,
    tiles: [{
      zones: [ ZONE.NZ0 ],
      index: 9,
      entities: [ 0x2ca8, 0x360a ],
    }, {
      addresses: [ 0x0b5a7a ],
      enemy: 13,
    }],
  }, {
    name: 'Short Sword',
    type: TYPE.WEAPON1,
    id: 19,
    tiles: [{
      addresses: [ 0x0b6b3c ],
      enemy: 9,
    }, {
      addresses: [ 0x04bc9324 ],
      enemy: 9,
      noOffset: true,
    }],
  }, {
    name: 'Combat Knife',
    type: TYPE.WEAPON1,
    id: 20,
    tiles: [{
      zones: [ ZONE.CHI ],
      index: 5,
      entities: [ 0x1a84, 0x1df4 ],
    }, {
      addresses: [ 0x0b7964 ],
      enemy: 84,
    }],
  }, {
    name: 'Nunchaku',
    type: TYPE.WEAPON2,
    id: 21,
    tiles: [{
      zones: [ ZONE.NO4 ],
      index: 36,
      entities: [ 0x3c4e, 0x4c72 ],
    }],
  }, {
    name: 'Were Bane',
    type: TYPE.WEAPON1,
    id: 22,
    tiles: [{
      addresses: [ 0x0b80ac ],
      enemy: 60,
    }],
  }, {
    name: 'Rapier',
    type: TYPE.WEAPON1,
    id: 23,
    tiles: [{
      addresses: [ 0x0b5dc4 ],
      enemy: 45,
    }, {
      addresses: [ 0x0b71a2 ],
      enemy: 47,
    }],
  }, {
    name: 'Karma Coin',
    type: TYPE.USABLE,
    id: 24,
    tiles: [{
      zones: [ ZONE.CHI ],
      index: 1,
      entities: [ 0x1a8e, 0x1dfe ],
    }, {
      zones: [ ZONE.CAT ],
      index: 14,
      entities: [ 0x3346, 0x3c3a ],
    }, {
      zones: [ ZONE.CAT ],
      index: 13,
      entities: [ 0x335a, 0x3c30 ],
    }, {
      zones: [ ZONE.RNZ1 ],
      index: 1,
      entities: [ 0x2aea, 0x3316 ],
    }, {
      zones: [ ZONE.RCAT ],
      index: 4,
      entities: [ 0x2d2a, 0x389e ],
    }, {
      zones: [ ZONE.RCAT ],
      index: 5,
      entities: [ 0x2d3e, 0x38a8 ],
    }, {
      addresses: [ 0x0b70dc ],
      enemy: 114,
    }, {
      addresses: [ 0x0b7322 ],
      enemy: 116,
    }],
  }, {
    name: 'Magic Missile',
    type: TYPE.USABLE,
    id: 25,
    tiles: [{
      zones: [ ZONE.DAI ],
      index: 5,
      entities: [ 0x28f6, 0x32d8 ],
    }, {
      zones: [ ZONE.NZ1 ],
      index: 0,
      entities: [ 0x2a52, 0x34ea ],
    }, {
      zones: [ ZONE.RNZ1 ],
      index: 0,
      entities: [ 0x2ad6, 0x32ee ],
    }, {
      zones: [ ZONE.RCAT ],
      index: 0,
      entities: [ 0x285c, 0x338a ],
    }, {
      zones: [ ZONE.RDAI ],
      index: 15,
      entities: [ 0x2562, 0x2ece ],
    }, {
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a30d6 ],
      shop: true,
    }, {
      addresses: [ 0x0b6ac4 ],
      enemy: 26,
    }, {
      addresses: [ 0x0b6bb2 ],
      enemy: 32,
    }, {
      addresses: [ 0x0b7a7c ],
      enemy: 118,
    }],
  }, {
    name: 'Red Rust',
    type: TYPE.WEAPON2,
    id: 26,
    tiles: [{
      addresses: [ 0x0b6b3a ],
      enemy: 9,
    }, {
      addresses: [ 0x04bc9328 ],
      enemy: 9,
      noOffset: true,
    }],
  }, {
    name: 'Takemitsu',
    type: TYPE.WEAPON2,
    id: 27,
    tiles: [{
      zones: [ ZONE.LIB ],
      index: 5,
      entities: [ 0x377c, 0x3f10 ],
    }, {
      addresses: [ 0x0b5eb4 ],
      enemy: 23,
    }],
  }, {
    name: 'Shotel',
    type: TYPE.WEAPON1,
    id: 28,
    tiles: [{
      zones: [ ZONE.RNO1 ],
      index: 1,
      entities: [ 0x215c, 0x2852 ],
    }, {
      addresses: [ 0x0b6de4 ],
      enemy: 69,
    }],
  }, {
    name: 'Orange',
    type: TYPE.USABLE,
    id: 29,
    food: true,
  }, {
    name: 'Apple',
    type: TYPE.USABLE,
    id: 30,
    food: true,
    tiles: [{
      addresses: [ 0x0b828c ],
      enemy: 73,
    }],
  }, {
    name: 'Banana',
    type: TYPE.USABLE,
    id: 31,
    food: true,
    tiles: [{
      addresses: [ 0x0b669c ],
      enemy: 38,
    }],
  }, {
    name: 'Grapes',
    type: TYPE.USABLE,
    id: 32,
    food: true,
    tiles: [{
      addresses: [ 0x0b748c ],
      enemy: 17,
    }],
  }, {
    name: 'Strawberry',
    type: TYPE.USABLE,
    id: 33,
    food: true,
    tiles: [{
      addresses: [ 0x0b748a ],
      enemy: 17,
    }],
  }, {
    name: 'Pineapple',
    type: TYPE.USABLE,
    id: 34,
    food: true,
  }, {
    name: 'Peanuts',
    type: TYPE.USABLE,
    id: 35,
    food: true,
    tiles: [{
      zones: [ ZONE.CHI ],
      index: 9,
      entities: [ 0x1a48, 0x1dc2 ],
    }, {
      zones: [ ZONE.CHI ],
      index: 10,
      entities: [ 0x1a52, 0x1da4 ],
    }, {
      zones: [ ZONE.CHI ],
      index: 11,
      entities: [ 0x1a5c, 0x1dae ],
    }, {
      zones: [ ZONE.CHI ],
      index: 12,
      entities: [ 0x1a66, 0x1db8 ],
    }],
  }, {
    name: 'Toadstool',
    type: TYPE.USABLE,
    id: 36,
    food: true,
    tiles: [{
      zones: [ ZONE.NO4 ],
      index: 26,
      entities: [ 0x3c58, 0x4b3c ],
    }, {
      zones: [ ZONE.NO4 ],
      index: 33,
      entities: [ 0x36d6, 0x4876 ],
    }, {
      zones: [ ZONE.RNO4 ],
      index: 2,
      entities: [ 0x31aa, 0x4078 ],
    }],
  }, {
    name: 'Shiitake',
    type: TYPE.USABLE,
    id: 37,
    food: true,
    tiles: [{
      zones: [ ZONE.NO4 ],
      index: 12,
      entities: [ 0x3550, 0x461e ],
    }, {
      zones: [ ZONE.NO4 ],
      index: 35,
      entities: [ 0x36ae, 0x4736 ],
    }, {
      zones: [ ZONE.NO4 ],
      index: 27,
      entities: [ 0x3bea, 0x4b0a ],
    }, {
      zones: [ ZONE.NO4 ],
      index: 32,
      entities: [ 0x36cc, 0x47ea ],
    }, {
      zones: [ ZONE.CHI ],
      index: 7,
      entities: [ 0x1c46, 0x1fc0 ],
    }, {
      zones: [ ZONE.CHI ],
      index: 6,
      entities: [ 0x1c6e, 0x1fca ],
    }, {
      zones: [ ZONE.RNO4 ],
      index: 1,
      entities: [ 0x3bfa, 0x4b68 ],
    }, {
      zones: [ ZONE.RNO4 ],
      index: 10,
      entities: [ 0x31d2, 0x42a8 ],
    }, {
      zones: [ ZONE.RNO4 ],
      index: 9,
      entities: [ 0x3236, 0x42b2 ],
    }, {
      zones: [ ZONE.RNO4 ],
      index: 3,
      entities: [ 0x31b4, 0x4082 ],
    }, {
      zones: [ ZONE.RCHI ],
      index: 6,
      entities: [ 0x1bd6, 0x204a ],
    }, {
      zones: [ ZONE.RCHI ],
      index: 7,
      entities: [ 0x1c30, 0x207c ],
    }],
  }, {
    name: 'Cheesecake',
    type: TYPE.USABLE,
    id: 38,
    food: true,
    tiles: [{
      addresses: [ 0x0b80aa ],
      enemy: 60,
    }],
  }, {
    name: 'Shortcake',
    type: TYPE.USABLE,
    id: 39,
    food: true,
    tiles: [{
      addresses: [ 0x0b7fba ],
      enemy: 82,
    }],
  }, {
    name: 'Tart',
    type: TYPE.USABLE,
    id: 40,
    food: true,
    tiles: [{
      addresses: [ 0x0b5af2 ],
      enemy: 22,
    }],
  }, {
    name: 'Parfait',
    type: TYPE.USABLE,
    id: 41,
    food: true,
  }, {
    name: 'Pudding',
    type: TYPE.USABLE,
    id: 42,
    food: true,
  }, {
    name: 'Ice Cream',
    type: TYPE.USABLE,
    id: 43,
    food: true,
    tiles: [{
      addresses: [ 0x0b6a4a ],
      enemy: 49,
    }],
  }, {
    name: 'Frankfurter',
    type: TYPE.USABLE,
    id: 44,
    food: true,
    tiles: [{
      zones: [ ZONE.TOP ],
      index: 7,
      entities: [ 0x241c, 0x29dc ],
    }, {
      zones: [ ZONE.LIB ],
      index: 7,
      entities: [ 0x379a, 0x3f24 ],
    }, {
      addresses: [ 0x0b5aa2 ],
      enemy: 104,
    }],
  }, {
    name: 'Hamburger',
    type: TYPE.USABLE,
    id: 45,
    food: true,
  }, {
    name: 'Pizza',
    type: TYPE.USABLE,
    id: 46,
    food: true,
    tiles: [{
      addresses: [ 0x0b6b62 ],
      enemy: 44,
    }, {
      addresses: [ 0x0b6b8a ],
      enemy: 48,
    }],
  }, {
    name: 'Cheese',
    type: TYPE.USABLE,
    id: 47,
    food: true,
    tiles: [{
      zones: [ ZONE.NO2 ],
      index: 6,
      entities: [ 0x34ac, 0x3be8 ],
    }, {
      addresses: [ 0x0b5eb2 ],
      enemy: 23,
    }],
  }, {
    name: 'Ham and eggs',
    type: TYPE.USABLE,
    id: 48,
    food: true,
    tiles: [{
      addresses: [ 0x0b6122 ],
      enemy: 56,
    }, {
      addresses: [ 0x0b6d42 ],
      enemy: 58,
    }],
  }, {
    name: 'Omelette',
    type: TYPE.USABLE,
    id: 49,
    food: true,
  }, {
    name: 'Morning Set',
    type: TYPE.USABLE,
    id: 50,
    food: true,
    tiles: [{
      addresses: [ 0x0b7a2a ],
      enemy: 15,
    }],
  }, {
    name: 'Lunch A',
    type: TYPE.USABLE,
    id: 51,
    food: true,
    tiles: [{
      addresses: [ 0x0b87a4 ],
      enemy: 100,
    }],
  }, {
    name: 'Lunch B',
    type: TYPE.USABLE,
    id: 52,
    food: true,
  }, {
    name: 'Curry Rice',
    type: TYPE.USABLE,
    id: 53,
    food: true,
  }, {
    name: 'Gyros plate',
    type: TYPE.USABLE,
    id: 54,
    food: true,
  }, {
    name: 'Spaghetti',
    type: TYPE.USABLE,
    id: 55,
    food: true,
  }, {
    name: 'Grape Juice',
    type: TYPE.USABLE,
    id: 56,
    food: true,
    tiles: [{
      zones: [ ZONE.DAI ],
      addresses: [ 0x046c2658 ],
      despawn: true,
      noOffset: true,
    }],
  }, {
    name: 'Barley Tea',
    type: TYPE.USABLE,
    id: 57,
    food: true,
    tiles: [{
      zones: [ ZONE.CHI ],
      index: 8,
      entities: [ 0x1a3e, 0x1dd6 ],
    }, {
      addresses: [ 0x0b7a2c ],
      enemy: 15,
    }],
  }, {
    name: 'Green Tea',
    type: TYPE.USABLE,
    id: 58,
    food: true,
    tiles: [{
      zones: [ ZONE.ARE ],
      index: 6,
      entities: [ 0x3482, 0x3b0a ],
    }, {
      zones: [ ZONE.RCHI ],
      index: 3,
      entities: [ 0x1938, 0x1d98 ],
    }, {
      addresses: [ 0x0b6c7a ],
      enemy: 94,
    }, {
      addresses: [ 0x0b5e62 ],
      enemy: 123,
    }],
  }, {
    name: 'Natou',
    type: TYPE.USABLE,
    id: 59,
    food: true,
    tiles: [{
      addresses: [ 0x0b6c2a ],
      enemy: 71,
    }],
  }, {
    name: 'Ramen',
    type: TYPE.USABLE,
    id: 60,
    food: true,
    tiles: [{
      addresses: [ 0x0b920c ],
      enemy: 99,
    }],
  }, {
    name: 'Miso Soup',
    type: TYPE.USABLE,
    id: 61,
    food: true,
    tiles: [{
      addresses: [ 0x0b6c2c ],
      enemy: 71,
    }],
  }, {
    name: 'Sushi',
    type: TYPE.USABLE,
    id: 62,
    food: true,
    tiles: [{
      addresses: [ 0x0b9642 ],
      enemy: 91,
    }, {
      addresses: [ 0x0b5e64 ],
      enemy: 123,
    }],
  }, {
    name: 'Pork Bun',
    type: TYPE.USABLE,
    id: 63,
    food: true,
    tiles: [{
      zones: [ ZONE.CAT ],
      index: 15,
      entities: [ 0x3404, 0x3ce4 ],
    }, {
      addresses: [ 0x0b6ca2 ],
      enemy: 53,
    }],
  }, {
    name: 'Red Bean Bun',
    type: TYPE.USABLE,
    id: 64,
    food: true,
    tiles: [{
      zones: [ ZONE.RCAT ],
      index: 6,
      entities: [ 0x2dde, 0x3902 ],
    }, {
      addresses: [ 0x0b6cca ],
      enemy: 52,
    }],
  }, {
    name: 'Chinese Bun',
    type: TYPE.USABLE,
    id: 65,
    food: true,
  }, {
    name: 'Dim Sum Set',
    type: TYPE.USABLE,
    id: 66,
    food: true,
    tiles: [{
      zones: [ ZONE.RNO1 ],
      addresses: [ 0x0507d08c ],
      despawn: true,
      noOffset: true,
    }],
  }, {
    name: 'Pot Roast',
    type: TYPE.USABLE,
    id: 67,
    food: true,
    tiles: [{
      zones: [ ZONE.NO3 ],
      addresses: [ 0x04ba9774, 0x05431554 ],
      despawn: true,
      noOffset: true,
    }, {
      zones: [ ZONE.NO1 ],
      addresses: [ 0x04a197d8 ],
      despawn: true,
      noOffset: true,
    }, {
      zones: [ ZONE.NZ1 ],
      addresses: [ 0x0557379c ],
      despawn: true,
      noOffset: true,
    }, {
      zones: [ ZONE.RNZ1 ],
      addresses: [ 0x059bc34c ],
      despawn: true,
      noOffset: true,
    }, {
      zones: [ ZONE.RNO3 ],
      addresses: [ 0x051e6e4c ],
      despawn: true,
      noOffset: true,
    }, {
      zones: [ ZONE.TOP ],
      index: 6,
      entities: [ 0x2412, 0x29d2 ],
      despawn: true,
    }, {
      zones: [ ZONE.NO4, ZONE.BO3 ],
      index: 21,
      entities: [ 0x41da, 0x5262, 0x1d5c, 0x1f20 ],
    }, {
      zones: [ ZONE.RNO4 ],
      index: 22,
      entities: [ 0x39c0, 0x4910 ],
    }, {
      addresses: [ 0x0b6442 ],
      enemy: 55,
    }],
  }, {
    name: 'Sirloin',
    type: TYPE.USABLE,
    id: 68,
    food: true,
    tiles: [{
      zones: [ ZONE.TOP ],
      index: 4,
      entities: [ 0x23fe, 0x29be ],
    }, {
      addresses: [ 0x0b6f4c ],
      enemy: 81,
    }, {
      addresses: [ 0x0b9d14 ],
      enemy: 112,
    }],
  }, {
    name: 'Turkey',
    type: TYPE.USABLE,
    id: 69,
    food: true,
    tiles: [{
      zones: [ ZONE.NO3 ],
      addresses: [ 0x04baa2b0, 0x05431f60 ],
      despawn: true,
      noOffset: true,
    }, {
      zones: [ ZONE.TOP ],
      index: 1,
      entities: [ 0x2124, 0x282e ],
      despawn: true,
    }, {
      zones: [ ZONE.TOP ],
      index: 5,
      entities: [ 0x2408, 0x29c8 ],
    }, {
      zones: [ ZONE.CHI ],
      addresses: [ 0x045e9602 ],
      despawn: true,
    }, {
      addresses: [ 0x0b6124 ],
      enemy: 56,
    }],
  }, {
    name: 'Meal Ticket',
    type: TYPE.USABLE,
    id: 70,
    tiles: [{
      zones: [ ZONE.NO4 ],
      index: 14,
      entities: [ 0x3640, 0x46b4 ],
    }, {
      zones: [ ZONE.NO4 ],
      index: 15,
      entities: [ 0x364a, 0x46be ],
    }, {
      zones: [ ZONE.NO4 ],
      index: 16,
      entities: [ 0x362c, 0x46c8 ],
    }, {
      zones: [ ZONE.NO4 ],
      index: 17,
      entities: [ 0x3636, 0x46d2 ],
    }, {
      zones: [ ZONE.RNO0 ],
      index: 9,
      offsets: [ 0x407c, 0x510e ],
    }, {
      zones: [ ZONE.RNO4 ],
      index: 16,
      entities: [ 0x3056, 0x3fce ],
    }, {
      zones: [ ZONE.RNO4 ],
      index: 17,
      entities: [ 0x3060, 0x3fba ],
    }, {
      zones: [ ZONE.RNO4 ],
      index: 18,
      entities: [ 0x3074, 0x3fc4 ],
    }, {
      zones: [ ZONE.RNO4 ],
      index: 19,
      entities: [ 0x307e, 0x3fa6 ],
    }, {
      zones: [ ZONE.RNO4 ],
      index: 20,
      entities: [ 0x306a, 0x3fb0 ],
    }, {
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a3126 ],
      shop: true,
    }, {
      addresses: [ 0x0b66ea ],
      enemy: 29,
    }, {
      addresses: [ 0x0b5e3c ],
      enemy: 109,
    }],
  }, {
    name: 'Neutron Bomb',
    type: TYPE.USABLE,
    id: 71,
    tiles: [{
      zones: [ ZONE.RLIB ],
      index: 6,
      entities: [ 0x1ccc, 0x226c ],
    }, {
      zones: [ ZONE.ST0 ],
      addresses: [ 0x119d00 ],
      noOffset: true,
      reward: true,
    }, {
      addresses: [ 0x0b69fa ],
      enemy: 28,
    }, {
      addresses: [ 0x0b73ec ],
      enemy: 122,
    }],
  }, {
    name: 'Power of Sire',
    type: TYPE.USABLE,
    id: 72,
    tiles: [{
      zones: [ ZONE.CHI ],
      index: 0,
      entities: [ 0x1a34, 0x1dcc ],
    }, {
      zones: [ ZONE.RCHI ],
      index: 0,
      entities: [ 0x1910, 0x1d7a ],
    }, {
      zones: [ ZONE.RCHI ],
      index: 4,
      offsets: [ 0x1942, 0x1da2 ],
    }, {
      zones: [ ZONE.ST0 ],
      entities: [ 0x282a, 0x29c4 ],
      candle: 0x90,
    }],
  }, {
    name: 'Pentagram',
    type: TYPE.USABLE,
    id: 73,
    tiles: [{
      zones: [ ZONE.NZ1 ],
      index: 1,
      entities: [ 0x2a0c, 0x34f4 ],
    }, {
      zones: [ ZONE.NO4 ],
      index: 30,
      entities: [ 0x3f28, 0x4fb0 ],
    }, {
      addresses: [ 0x0b5af4 ],
      enemy: 22,
    }, {
      addresses: [ 0x0b819c ],
      enemy: 31,
    }, {
      addresses: [ 0x0b83ca ],
      enemy: 40,
    }],
  }, {
    name: 'Bat Pentagram',
    type: TYPE.USABLE,
    id: 74,
    tiles: [{
      zones: [ ZONE.RNO4 ],
      index: 5,
      entities: [ 0x3754, 0x46a4 ],
    }, {
      addresses: [ 0x0b819a ],
      enemy: 31,
    }],
  }, {
    name: 'Shuriken',
    type: TYPE.USABLE,
    id: 75,
    tiles: [{
      zones: [ ZONE.DAI ],
      index: 6,
      entities: [ 0x291e, 0x32b0 ],
    }, {
      zones: [ ZONE.RNO2 ],
      index: 10,
      entities: [ 0x29ac, 0x3190 ],
    }, {
      zones: [ ZONE.NZ1 ],
      addresses: [ 0x055737a0 ],
      despawn: true,
      noOffset: true,
    }, {
      zones: [ ZONE.RNZ1 ],
      addresses: [ 0x059bc350 ],
      despawn: true,
      noOffset: true,
    }, {
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a30fe ],
      shop: true,
    }, {
      addresses: [ 0x0b5aa4 ],
      enemy: 104,
    }, {
      addresses: [ 0x0b6cf4 ],
      enemy: 106,
    }],
  }, {
    name: 'Cross Shuriken',
    type: TYPE.USABLE,
    id: 76,
    tiles: [{
      zones: [ ZONE.CAT ],
      index: 12,
      entities: [ 0x333c, 0x3bea ],
    }, {
      zones: [ ZONE.CAT ],
      index: 11,
      entities: [ 0x3350, 0x3be0 ],
    }, {
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a3106 ],
      shop: true,
    }, {
      addresses: [ 0x0b6de2 ],
      enemy: 69,
    }],
  }, {
    name: 'Buffalo Star',
    type: TYPE.USABLE,
    id: 77,
    tiles: [{
      zones: [ ZONE.RCAT ],
      index: 1,
      entities: [ 0x2866, 0x3380 ],
    }, {
      zones: [ ZONE.RARE ],
      index: 2,
      entities: [ 0x2400, 0x29aa ],
    }, {
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a310e ],
      shop: true,
    }, {
      addresses: [ 0x0b7ef4 ],
      enemy: 120,
    }],
  }, {
    name: 'Flame Star',
    type: TYPE.USABLE,
    id: 78,
    tiles: [{
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a3116 ],
      shop: true,
    }, {
      addresses: [ 0x0b6cf2 ],
      enemy: 106,
    }],
  }, {
    name: 'TNT',
    type: TYPE.USABLE,
    id: 79,
    tiles: [{
      zones: [ ZONE.DAI ],
      index: 7,
      entities: [ 0x2946, 0x3292 ],
    }, {
      zones: [ ZONE.NZ1 ],
      addresses: [ 0x055737a8 ],
      despawn: true,
      noOffset: true,
    }, {
      zones: [ ZONE.RNZ1 ],
      addresses: [ 0x059bc358 ],
      despawn: true,
      noOffset: true,
    }, {
      addresses: [ 0x0b669a ],
      enemy: 38,
    }, {
      addresses: [ 0x0b75cc ],
      enemy: 103,
    }],
  }, {
    name: 'Bwaka Knife',
    type: TYPE.USABLE,
    id: 80,
    tiles: [{
      zones: [ ZONE.RDAI ],
      index: 14,
      entities: [ 0x254e, 0x2ed8 ],
    }, {
      zones: [ ZONE.NZ1 ],
      addresses: [ 0x055737a4 ],
      despawn: true,
      noOffset: true,
    }, {
      zones: [ ZONE.RNZ1 ],
      addresses: [ 0x059bc354 ],
      despawn: true,
      noOffset: true,
    }, {
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a30de ],
      shop: true,
    }],
  }, {
    name: 'Boomerang',
    type: TYPE.USABLE,
    id: 81,
    tiles: [{
      zones: [ ZONE.DAI ],
      index: 8,
      entities: [ 0x2964, 0x326a ],
    }, {
      zones: [ ZONE.RDAI ],
      index: 8,
      entities: [ 0x1efa, 0x288e ],
    }, {
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a30e6 ],
      shop: true,
    }, {
      addresses: [ 0x0b5a2c ],
      enemy: 16,
    }],
  }, {
    name: 'Javelin',
    type: TYPE.USABLE,
    id: 82,
    tiles: [{
      zones: [ ZONE.RDAI ],
      index: 9,
      entities: [ 0x1ed2, 0x28c0 ],
    }, {
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a30ee ],
      shop: true,
    }, {
      addresses: [ 0x0b682c ],
      enemy: 39,
    }, {
      addresses: [ 0x0b6ed2 ],
      enemy: 41,
    }, {
      addresses: [ 0x0b6d44 ],
      enemy: 58,
    }, {
      addresses: [ 0x0b91e4 ],
      enemy: 97,
    }],
  }, {
    name: 'Tyrfing',
    type: TYPE.WEAPON1,
    id: 83,
    tiles: [{
      zones: [ ZONE.TOP ],
      index: 3,
      entities: [ 0x23b8, 0x2964 ],
    }],
  }, {
    name: 'Namakura',
    type: TYPE.WEAPON2,
    id: 84,
    tiles: [{
      addresses: [ 0x0b6e32 ],
      enemy: 25,
    }],
  }, {
    name: 'Knuckle Duster',
    type: TYPE.WEAPON1,
    id: 85,
    tiles: [{
      zones: [ ZONE.NO4 ],
      index: 23,
      entities: [ 0x3c80, 0x4e66 ],
    }, {
      addresses: [ 0x0b6b8c ],
      enemy: 48,
    }],
  }, {
    name: 'Gladius',
    type: TYPE.WEAPON1,
    id: 86,
    tiles: [{
      zones: [ ZONE.NO1 ],
      index: 4,
      entities: [ 0x363e, 0x3e24 ],
    }],
  }, {
    name: 'Scimitar',
    type: TYPE.WEAPON1,
    id: 87,
    tiles: [{
      zones: [ ZONE.NO4, ZONE.BO3 ],
      index: 19,
      entities: [ 0x423e, 0x52bc, 0x1e24, 0x1fde ],
    }, {
      addresses: [ 0x0b872c ],
      enemy: 51,
    }],
  }, {
    name: 'Cutlass',
    type: TYPE.WEAPON1,
    id: 88,
    tiles: [{
      zones: [ ZONE.DAI ],
      index: 14,
      entities: [ 0x3026, 0x3972 ],
    }, {
      addresses: [ 0x0b59dc ],
      enemy: 43,
    }, {
      addresses: [ 0x0b7824 ],
      enemy: 46,
    }, {
      addresses: [ 0x0b5b94 ],
      enemy: 62,
    }],
  }, {
    name: 'Saber',
    type: TYPE.WEAPON1,
    id: 89,
    tiles: [{
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a312e ],
      shop: true,
    }, {
      addresses: [ 0x0b5dc2 ],
      enemy: 45,
    }, {
      addresses: [ 0x0b859a ],
      enemy: 50,
    }],
  }, {
    name: 'Falchion',
    type: TYPE.WEAPON1,
    id: 90,
    tiles: [{
      zones: [ ZONE.TOP ],
      index: 12,
      entities: [ 0x2476, 0x2a22 ],
    }],
  }, {
    name: 'Broadsword',
    type: TYPE.WEAPON1,
    id: 91,
    tiles: [{
      zones: [ ZONE.NO2 ],
      index: 4,
      entities: [ 0x34c0, 0x3bd4 ],
    }, {
      addresses: [ 0x0b6efc ],
      enemy: 57,
    }, {
      addresses: [ 0x0b7014 ],
      enemy: 63,
    }],
  }, {
    name: 'Bekatowa',
    type: TYPE.WEAPON1,
    id: 92,
    tiles: [{
      zones: [ ZONE.NZ1 ],
      index: 7,
      entities: [ 0x29e4, 0x33c8 ],
    }, {
      addresses: [ 0x0b59da ],
      enemy: 43,
    }],
  }, {
    name: 'Damascus Sword',
    type: TYPE.WEAPON1,
    id: 93,
    tiles: [{
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a313e ],
      shop: true,
    }, {
      addresses: [ 0x0b7822 ],
      enemy: 46,
    }],
  }, {
    name: 'Hunter Sword',
    type: TYPE.WEAPON1,
    id: 94,
    tiles: [{
      addresses: [ 0x0b79b4 ],
      enemy: 83,
    }],
  }, {
    name: 'Estoc',
    type: TYPE.WEAPON2,
    id: 95,
    tiles: [{
      zones: [ ZONE.NO2 ],
      index: 10,
      entities: [ 0x34e8, 0x3c06 ],
    }, {
      addresses: [ 0x0b6f9c ],
      enemy: 77,
    }],
  }, {
    name: 'Bastard Sword',
    type: TYPE.WEAPON1,
    id: 96,
    tiles: [{
      zones: [ ZONE.RTOP ],
      index: 4,
      entities: [ 0x1d66, 0x2162 ],
    }, {
      addresses: [ 0x0b6efa ],
      enemy: 57,
    }, {
      addresses: [ 0x0b7012 ],
      enemy: 63,
    }],
  }, {
    name: 'Jewel Knuckles',
    type: TYPE.WEAPON1,
    id: 97,
    tiles: [{
      zones: [ ZONE.NO1 ],
      index: 0,
      entities: [ 0x36d4, 0x3eba ],
    }, {
      addresses: [ 0x0b761c ],
      enemy: 117,
    }],
  }, {
    name: 'Claymore',
    type: TYPE.WEAPON2,
    id: 98,
    tiles: [{
      zones: [ ZONE.NO4 ],
      index: 13,
      entities: [ 0x3406, 0x4448 ],
    }, {
      addresses: [ 0x0b6f9a ],
      enemy: 77,
    }],
  }, {
    name: 'Talwar',
    type: TYPE.WEAPON1,
    id: 99,
    tiles: [{
      zones: [ ZONE.RDAI ],
      index: 13,
      entities: [ 0x2472, 0x2e06 ],
    }],
  }, {
    name: 'Katana',
    id: 100,
    type: TYPE.WEAPON2,
    tiles: [{
      zones: [ ZONE.RNZ0 ],
      index: 5,
      entities: [ 0x2322, 0x2be4 ],
    }, {
      addresses: [ 0x0b6c7c ],
      enemy: 94,
    }],
  }, {
    name: 'Flamberge',
    type: TYPE.WEAPON2,
    id: 101,
    tiles: [{
      addresses: [ 0x0b88bc ],
      enemy: 78,
    }],
  }, {
    name: 'Iron Fist',
    type: TYPE.WEAPON1,
    id: 102,
    tiles: [{
      addresses: [ 0x0b9d8c ],
      enemy: 108,
    }],
  }, {
    name: 'Zwei Hander',
    type: TYPE.WEAPON2,
    id: 103,
    tiles: [{
      addresses: [ 0x0b9e04 ],
      enemy: 128,
    }],
  }, {
    name: 'Sword of Hador',
    type: TYPE.WEAPON1,
    id: 104,
    tiles: [{
      zones: [ ZONE.RNO2 ],
      index: 1,
      entities: [ 0x29fc, 0x31e0 ],
    }],
  }, {
    name: 'Luminus',
    type: TYPE.WEAPON1,
    id: 105,
    tiles: [{
      zones: [ ZONE.RNZ1 ],
      index: 3,
      entities: [ 0x2afe, 0x335c ],
    }],
  }, {
    name: 'Harper',
    type: TYPE.WEAPON1,
    id: 106,
    tiles: [{
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a315e ],
      shop: true,
    }],
  }, {
    name: 'Obsidian Sword',
    type: TYPE.WEAPON2,
    id: 107,
    tiles: [{
      addresses: [ 0x0b5c0c ],
      enemy: 80,
    }],
  }, {
    name: 'Gram',
    type: TYPE.WEAPON1,
    id: 108,
    tiles: [{
      zones: [ ZONE.RARE ],
      index: 3,
      entities: [ 0x2428, 0x29c8 ],
    }],
  }, {
    name: 'Jewel Sword',
    type: TYPE.WEAPON1,
    id: 109,
    tiles: [{
      zones: [ ZONE.NO3 ],
      index: 9,
      entities: [ 0x3e56, 0x459c ],
    }, {
      addresses: [ 0x0b65aa ],
      enemy: 86,
    }],
  }, {
    name: 'Mormegil',
    type: TYPE.WEAPON1,
    id: 110,
    tiles: [{
      zones: [ ZONE.CAT ],
      index: 3,
      entities: [ 0x2c02, 0x34e2 ],
    }],
  }, {
    name: 'Firebrand',
    type: TYPE.WEAPON1,
    id: 111,
    tiles: [{
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a3146 ],
      shop: true,
    }, {
      addresses: [ 0x0b6f4a ],
      enemy: 81,
    }, {
      zones: [ ZONE.ST0 ],
      entities: [ 0x2802, 0x299c ],
      candle: 0x80,
    }],
  }, {
    name: 'Thunderbrand',
    type: TYPE.WEAPON1,
    id: 112,
    tiles: [{
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a3156 ],
      shop: true,
    }],
  }, {
    name: 'Icebrand',
    type: TYPE.WEAPON1,
    id: 113,
    tiles: [{
      zones: [ ZONE.CAT ],
      index: 1,
      entities: [ 0x2c3e, 0x351e ],
    }, {
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a314e ],
      shop: true,
    }, {
      addresses: [ 0x0b89aa ],
      enemy: 79,
    }],
  }, {
    name: 'Stone Sword',
    type: TYPE.WEAPON1,
    id: 114,
    tiles: [{
      addresses: [ 0x0b5d4a ],
      enemy: 125,
    }],
  }, {
    name: 'Holy Sword',
    type: TYPE.WEAPON1,
    id: 115,
    tiles: [{
      zones: [ ZONE.ARE ],
      index: 7,
      entities: [ 0x34be, 0x3b46 ],
    }, {
      addresses: [ 0x0b80d4 ],
      enemy: 64,
    }],
  }, {
    name: 'Terminus Est',
    type: TYPE.WEAPON1,
    id: 116,
    tiles: [{
      addresses: [ 0x0b6e82 ],
      enemy: 113,
    }],
  }, {
    name: 'Marsil',
    type: TYPE.WEAPON1,
    id: 117,
    tiles: [{
      addresses: [ 0x0b65fa ],
      enemy: 124,
    }],
  }, {
    name: 'Dark Blade',
    type: TYPE.WEAPON1,
    id: 118,
    tiles: [{
      zones: [ ZONE.RNO4 ],
      index: 23,
      entities: [ 0x309c, 0x3fec ],
    }],
  }, {
    name: 'Heaven Sword',
    type: TYPE.WEAPON1,
    id: 119,
    tiles: [{
      addresses: [ 0x0b88ba ],
      enemy: 78,
    }],
  }, {
    name: 'Fist of Tulkas',
    type: TYPE.WEAPON1,
    id: 120,
    tiles: [{
      addresses: [ 0x0b8752 ],
      enemy: 96,
    }],
  }, {
    name: 'Gurthang',
    type: TYPE.WEAPON1,
    id: 121,
    tiles: [{
      addresses: [ 0x0b7064 ],
      enemy: 119,
    }],
  }, {
    name: 'Mourneblade',
    type: TYPE.WEAPON1,
    id: 122,
    tiles: [{
      addresses: [ 0x0b8032 ],
      enemy: 137,
    }],
  }, {
    name: 'Alucard Sword',
    type: TYPE.WEAPON1,
    id: 123,
    tiles: [{
      zones: [ ZONE.RCHI ],
      index: 2,
      entities: [ 0x1cda, 0x213a ],
    }],
  }, {
    name: 'Mablung Sword',
    type: TYPE.WEAPON1,
    id: 124,
    tiles: [{
      addresses: [ 0x0b7062 ],
      enemy: 119,
    }],
  }, {
    name: 'Badelaire',
    type: TYPE.WEAPON1,
    id: 125,
    tiles: [{
      zones: [ ZONE.RLIB ],
      index: 7,
      entities: [ 0x1b00, 0x20a0 ],
    }, {
      zones: [ ZONE.ST0 ],
      entities: [ 0x27ee, 0x2988 ],
      candle: 0x90,
    }],
  }, {
    name: 'Great Sword',
    type: TYPE.WEAPON2,
    id: 127,
    tiles: [{
      addresses: [ 0x0b9ea4 ],
      enemy: 143,
    }],
  }, {
    name: 'Mace',
    type: TYPE.WEAPON1,
    id: 128,
    tiles: [{
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a3136 ],
      shop: true,
    }],
  }, {
    name: 'Morning Star',
    type: TYPE.WEAPON1,
    id: 129,
    tiles: [{
      zones: [ ZONE.DAI ],
      index: 1,
      entities: [ 0x2982, 0x3242 ],
    }, {
      addresses: [ 0x0b6444 ],
      enemy: 55,
    }],
  }, {
    name: 'Holy Rod',
    type: TYPE.WEAPON1,
    id: 130,
    tiles: [{
      zones: [ ZONE.LIB ],
      index: 2,
      entities: [ 0x35b0, 0x3c5e ],
    }],
  }, {
    name: 'Star Flail',
    type: TYPE.WEAPON1,
    id: 131,
    tiles: [{
      zones: [ ZONE.NZ1 ],
      index: 3,
      entities: [ 0x284a, 0x327e ],
    }],
  }, {
    name: 'Moon Rod',
    type: TYPE.WEAPON1,
    id: 132,
    tiles: [{
      zones: [ ZONE.RNZ1 ],
      index: 11,
      entities: [ 0x2d06, 0x3578 ],
    }, {
      zones: [ ZONE.ST0 ],
      entities: [ 0x27e4, 0x297e ],
      candle: 0x90,
    }],
  }, {
    name: 'Chakram',
    type: TYPE.WEAPON1,
    id: 133,
    tiles: [{
      addresses: [ 0x0b65ac ],
      enemy: 86,
    }],
  }, {
    name: 'Fire Boomerang',
    type: TYPE.USABLE,
    id: 134,
    tiles: [{
      zones: [ ZONE.RNO3 ],
      index: 7,
      entities: [ 0x2d28, 0x33fe ],
    }, {
      zones: [ ZONE.RDAI ],
      index: 2,
      entities: [ 0x1e78, 0x2924 ],
    }, {
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a30f6 ],
      shop: true,
    }, {
      addresses: [ 0x0b5a2a ],
      enemy: 16,
    }],
  }, {
    name: 'Iron Ball',
    type: TYPE.USABLE,
    id: 135,
    tiles: [{
      zones: [ ZONE.NO2 ],
      index: 11,
      entities: [ 0x3470, 0x3b98 ],
    }, {
      zones: [ ZONE.RTOP ],
      index: 1,
      entities: [ 0x1c80, 0x2004 ],
    }, {
      zones: [ ZONE.RNO0 ],
      index: 10,
      entities: [ 0x4568, 0x55be ],
    }, {
      addresses: [ 0x0b69fc ],
      enemy: 28,
    }],
  }, {
    name: 'Holbein Dagger',
    type: TYPE.WEAPON1,
    id: 136,
    tiles: [{
      addresses: [ 0x0b5c0a ],
      enemy: 80,
    }],
  }, {
    name: 'Blue Knuckles',
    type: TYPE.WEAPON1,
    id: 137,
    tiles: [{
      addresses: [ 0x0b6b64 ],
      enemy: 44,
    }],
  }, {
    name: 'Dynamite',
    type: TYPE.USABLE,
    id: 138,
    tiles: [{
      addresses: [ 0x0b75ca ],
      enemy: 103,
    }],
  }, {
    name: 'Osafune Katana',
    type: TYPE.WEAPON2,
    id: 139,
    tiles: [{
      zones: [ ZONE.RNO4 ],
      index: 26,
      entities: [ 0x37c2, 0x473a ],
    }],
  }, {
    name: 'Masamune',
    type: TYPE.WEAPON2,
    id: 140,
    tiles: [{
      addresses: [ 0x0b5e3a ],
      enemy: 109,
    }],
  }, {
    name: 'Muramasa',
    type: TYPE.WEAPON2,
    id: 141,
    tiles: [{
      addresses: [ 0x0b80d2 ],
      enemy: 64,
    }, {
      addresses: [ 0x0b91e2 ],
      enemy: 97,
    }],
  }, {
    name: 'Heart Refresh',
    type: TYPE.USABLE,
    id: 142,
    tiles: [{
      zones: [ ZONE.RNO0 ],
      index: 11,
      entities: [ 0x44fa, 0x555a ],
    }, {
      zones: [ ZONE.RNO2 ],
      index: 9,
      entities: [ 0x2970, 0x3154 ],
    }, {
      zones: [ ZONE.ST0 ],
      addresses: [ 0x119ca4 ],
      noOffset: true,
      reward: true,
    }, {
      addresses: [ 0x0b752a ],
      enemy: 95,
    }, {
      addresses: [ 0x0b8f3c ],
      enemy: 107,
    }, {
      addresses: [ 0x0b9e02 ],
      enemy: 128,
    }, {
      zones: [ ZONE.ST0 ],
      entities: [ 0x280c, 0x29a6 ],
      candle: 0x80,
    }],
  }, {
    name: 'Runesword',
    type: TYPE.WEAPON1,
    id: 143,
    tiles: [{
      addresses: [ 0x0b6b12 ],
      enemy: 141,
    }],
  }, {
    name: 'Antivenom',
    type: TYPE.USABLE,
    id: 144,
    tiles: [{
      zones: [ ZONE.LIB ],
      index: 9,
      entities: [ 0x3588, 0x3c40 ],
    }, {
      zones: [ ZONE.NO4 ],
      index: 4,
      entities: [ 0x3a6e, 0x4ca4 ],
    }, {
      zones: [ ZONE.RNO0 ],
      index: 2,
      entities: [ 0x3abe, 0x4a92 ],
    }, {
      zones: [ ZONE.RNO3 ],
      index: 1,
      entities: [ 0x2fda, 0x36ce ],
    }, {
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a30be ],
      shop: true,
    }, {
      addresses: [ 0x0b7462 ],
      enemy: 19,
    }, {
      addresses: [ 0x0b789c ],
      enemy: 33,
    }, {
      addresses: [ 0x0b74b4 ],
      enemy: 54,
    }],
  }, {
    name: 'Uncurse',
    type: TYPE.USABLE,
    id: 145,
    tiles: [{
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a30c6 ],
      shop: true,
    }, {
      addresses: [ 0x0b6764 ],
      enemy: 42,
    }, {
      zones: [ ZONE.LIB ],
      entities: [ 0x3448, 0x3b6e ],
      candle: 0x00,
    }, {
      zones: [ ZONE.LIB ],
      entities: [ 0x36b4, 0x3d58 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RLIB ],
      entities: [ 0x1dc6, 0x2302 ],
      candle: 0x00,
    }, {
      zones: [ ZONE.RLIB ],
      entities: [ 0x1e84, 0x242e ],
      candle: 0x00,
    }],
  }, {
    name: 'Life Apple',
    type: TYPE.USABLE,
    id: 146,
    tiles: [{
      zones: [ ZONE.NO3, ZONE.NP3 ],
      index: 2,
      entities: [ 0x40a2, 0x4824, 0x3e60, 0x4588 ],
    }, {
      zones: [ ZONE.NO0 ],
      index: 3,
      entities: [ 0x296c, 0x37f6 ],
    }, {
      zones: [ ZONE.RNZ1 ],
      index: 7,
      entities: [ 0x2a0e, 0x3276 ],
    }, {
      zones: [ ZONE.RCHI ],
      index: 1,
      entities: [ 0x191a, 0x1d70 ],
    }, {
      addresses: [ 0x0b828a ],
      enemy: 73,
    }],
  }, {
    name: 'Hammer',
    type: TYPE.USABLE,
    id: 147,
    tiles: [{
      zones: [ ZONE.NO0 ],
      index: 12,
      entities: [ 0x3134, 0x3fa0 ],
    }, {
      zones: [ ZONE.NO0 ],
      index: 4,
      entities: [ 0x2976, 0x3800 ],
    }, {
      zones: [ ZONE.RNO1 ],
      index: 2,
      entities: [ 0x2170, 0x285c ],
    }, {
      zones: [ ZONE.RNO3 ],
      index: 0,
      entities: [ 0x2f94, 0x36c4 ],
    }, {
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a30ce ],
      shop: true,
    }, {
      addresses: [ 0x0b7914 ],
      enemy: 85,
    }, {
      addresses: [ 0x0b5d4c ],
      enemy: 125,
    }],
  }, {
    name: 'Str. potion',
    type: TYPE.USABLE,
    id: 148,
    tiles: [{
      zones: [ ZONE.NO0 ],
      index: 13,
      entities: [ 0x3170, 0x3f14 ],
    }, {
      zones: [ ZONE.DAI ],
      index: 11,
      entities: [ 0x2e82, 0x36c0 ],
    }, {
      zones: [ ZONE.RNZ1 ],
      index: 2,
      entities: [ 0x2af4, 0x3352 ],
    }, {
      addresses: [ 0x0b632c ],
      enemy: 70,
    }],
  }, {
    name: 'Luck potion',
    type: TYPE.USABLE,
    id: 149,
    tiles: [{
      zones: [ ZONE.NO2 ],
      index: 9,
      entities: [ 0x3984, 0x4098 ],
    }, {
      zones: [ ZONE.RNO1 ],
      index: 4,
      entities: [ 0x256c, 0x2cbc ],
    }, {
      zones: [ ZONE.RNO2 ],
      index: 4,
      entities: [ 0x2948, 0x312c ],
    }, {
      addresses: [ 0x0b7874 ],
      enemy: 105,
    }, {
      addresses: [ 0x0b8ac4 ],
      enemy: 134,
    }],
  }, {
    name: 'Smart potion',
    type: TYPE.USABLE,
    id: 150,
    tiles: [{
      zones: [ ZONE.RNZ1 ],
      index: 4,
      entities: [ 0x2b12, 0x3348 ],
    }, {
      zones: [ ZONE.RDAI ],
      index: 11,
      entities: [ 0x2288, 0x2d5c ],
    }, {
      addresses: [ 0x0b614c ],
      enemy: 20,
    }],
  }, {
    name: 'Attack potion',
    type: TYPE.USABLE,
    id: 151,
    tiles: [{
      zones: [ ZONE.NO0 ],
      index: 11,
      entities: [ 0x372e, 0x45c2 ],
    }, {
      zones: [ ZONE.RCAT ],
      index: 12,
      entities: [ 0x2b2c, 0x36b4 ],
    }],
  }, {
    name: 'Shield Potion',
    type: TYPE.USABLE,
    id: 152,
    tiles: [{
      zones: [ ZONE.NO3, ZONE.NP3 ],
      index: 4,
      entities: [ 0x4156, 0x48ba, 0x3f1e, 0x4632 ],
    }, {
      zones: [ ZONE.RNO1 ],
      index: 5,
      entities: [ 0x2350, 0x2a46 ],
    }, {
      zones: [ ZONE.RCAT ],
      index: 11,
      entities: [ 0x2b36, 0x366e ],
    }, {
      zones: [ ZONE.RNO2 ],
      index: 3,
      entities: [ 0x293e, 0x3122 ],
    }, {
      addresses: [ 0x0b655c ],
      enemy: 7,
    }],
  }, {
    name: 'Resist Fire',
    type: TYPE.USABLE,
    id: 153,
    tiles: [{
      zones: [ ZONE.NO2 ],
      index: 8,
      entities: [ 0x397a, 0x40a2 ],
    }, {
      zones: [ ZONE.RTOP ],
      index: 17,
      entities: [ 0x1e06, 0x2248 ],
    }, {
      zones: [ ZONE.RLIB ],
      index: 3,
      entities: [ 0x1ace, 0x206e ],
    }, {
      zones: [ ZONE.RNO0 ],
      index: 8,
      entities: [ 0x44b4, 0x5514 ],
    }, {
      zones: [ ZONE.RCAT ],
      index: 3,
      entities: [ 0x2d48, 0x3858 ],
    }, {
      addresses: [ 0x0b805c ],
      enemy: 72,
    }],
  }, {
    name: 'Resist Thunder',
    type: TYPE.USABLE,
    id: 154,
    tiles: [{
      zones: [ ZONE.NZ0 ],
      index: 7,
      entities: [ 0x2956, 0x32c2 ],
    }, {
      zones: [ ZONE.RTOP ],
      index: 19,
      entities: [ 0x1dfc, 0x222a ],
    }, {
      zones: [ ZONE.RNO0 ],
      index: 7,
      entities: [ 0x44aa, 0x550a ],
    }, {
      zones: [ ZONE.RCAT ],
      index: 2,
      entities: [ 0x2d34, 0x384e ],
    }],
  }, {
    name: 'Resist Ice',
    type: TYPE.USABLE,
    id: 155,
    tiles: [{
      zones: [ ZONE.NO4, ZONE.BO3 ],
      index: 20,
      entities: [ 0x4216, 0x52c6, 0x1df2, 0x1fe8 ],
    }, {
      zones: [ ZONE.RTOP ],
      index: 18,
      entities: [ 0x1de8, 0x223e ],
    }, {
      zones: [ ZONE.RLIB ],
      index: 4,
      entities: [ 0x1ad8, 0x2078 ],
    }, {
      addresses: [ 0x0b89ac ],
      enemy: 79,
    }],
  }, {
    name: 'Resist Stone',
    type: TYPE.USABLE,
    id: 156,
    tiles: [{
      zones: [ ZONE.TOP ],
      index: 8,
      entities: [ 0x2430, 0x29e6 ],
    }, {
      zones: [ ZONE.RTOP ],
      index: 20,
      entities: [ 0x1df2, 0x2234 ],
    }, {
      zones: [ ZONE.RLIB ],
      index: 5,
      entities: [ 0x1ae2, 0x2082 ],
    }, {
      addresses: [ 0x0b8eec ],
      enemy: 24,
    }, {
      addresses: [ 0x0b8f14 ],
      enemy: 27,
    }],
  }, {
    name: 'Resist Holy',
    type: TYPE.USABLE,
    id: 157,
    tiles: [{
      zones: [ ZONE.TOP ],
      index: 10,
      entities: [ 0x2444, 0x29fa ],
    }, {
      zones: [ ZONE.RNO0 ],
      index: 6,
      entities: [ 0x44dc, 0x553c ],
    }],
  }, {
    name: 'Resist Dark',
    type: TYPE.USABLE,
    id: 158,
    tiles: [{
      zones: [ ZONE.TOP ],
      index: 9,
      entities: [ 0x243a, 0x29f0 ],
    }, {
      zones: [ ZONE.RNO0 ],
      index: 5,
      entities: [ 0x44d2, 0x5532 ],
    }, {
      zones: [ ZONE.RNZ0 ],
      index: 9,
      entities: [ 0x262e, 0x2edc ],
    }, {
      addresses: [ 0x0b641a ],
      enemy: 36,
    }, {
      addresses: [ 0x0b8a24 ],
      enemy: 87,
    }],
  }, {
    name: 'Potion',
    type: TYPE.USABLE,
    id: 159,
    tiles: [{
      zones: [ ZONE.NZ0 ],
      index: 10,
      entities: [ 0x2b72, 0x3556 ],
    }, {
      zones: [ ZONE.DAI ],
      index: 15,
      entities: [ 0x3008, 0x397c ],
    }, {
      zones: [ ZONE.LIB ],
      index: 8,
      entities: [ 0x357e, 0x3c36 ],
    }, {
      zones: [ ZONE.NO0 ],
      index: 5,
      entities: [ 0x2980, 0x380a ],
    }, {
      zones: [ ZONE.RNO0 ],
      index: 1,
      entities: [ 0x3ab4, 0x4a2e ],
    }, {
      zones: [ ZONE.RNO4 ],
      index: 8,
      entities: [ 0x3362, 0x414a ],
    }, {
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a309e ],
      shop: true,
    }, {
      zones: [ ZONE.ST0 ],
      addresses: [ 0x119bb8 ],
      noOffset: true,
      reward: true,
    }, {
      addresses: [ 0x0b63a4 ],
      enemy: 3,
    }, {
      addresses: [ 0x0b74b2 ],
      enemy: 54,
    }],
  }, {
    name: 'High Potion',
    type: TYPE.USABLE,
    id: 160,
    tiles: [{
      zones: [ ZONE.RTOP ],
      index: 21,
      entities: [ 0x1dde, 0x225c ],
    }, {
      zones: [ ZONE.RNO1 ],
      index: 6,
      entities: [ 0x2558, 0x2cb2 ],
    }, {
      zones: [ ZONE.RNO3 ],
      index: 2,
      entities: [ 0x302a, 0x3700 ],
    }, {
      zones: [ ZONE.RNZ0 ],
      index: 6,
      entities: [ 0x2804, 0x30e4 ],
    }, {
      zones: [ ZONE.RNO2 ],
      index: 2,
      entities: [ 0x2a06, 0x31ea ],
    }, {
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a30a6 ],
      shop: true,
    }, {
      addresses: [ 0x0b5edc ],
      enemy: 65,
    }],
  }, {
    name: 'Elixir',
    type: TYPE.USABLE,
    id: 161,
    tiles: [{
      zones: [ ZONE.NO4 ],
      index: 25,
      entities: [ 0x3dd4, 0x4e7a ],
    }, {
      zones: [ ZONE.RNO4 ],
      index: 25,
      entities: [ 0x3416, 0x43de ],
    }, {
      zones: [ ZONE.RCAT ],
      index: 7,
      entities: [ 0x3036, 0x3b64 ],
    }, {
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a30ae ],
      shop: true,
    }],
  }, {
    name: 'Manna Prism',
    type: TYPE.USABLE,
    id: 162,
    tiles: [{
      zones: [ ZONE.NO2 ],
      index: 7,
      entities: [ 0x3970, 0x40ac ],
    }, {
      zones: [ ZONE.RNO4 ],
      index: 24,
      entities: [ 0x342a, 0x42da ],
    }, {
      zones: [ ZONE.RNZ0 ],
      index: 4,
      entities: [ 0x2598, 0x2dec ],
    }, {
      zones: [ ZONE.RDAI ],
      index: 10,
      entities: [ 0x2364, 0x2d66 ],
    }, {
      zones: [ ZONE.RNO2 ],
      index: 5,
      entities: [ 0x2952, 0x3136 ],
    }, {
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a30b6 ],
      shop: true,
    }, {
      addresses: [ 0x0b6762 ],
      enemy: 42,
    }, {
      addresses: [ 0x0b80fa ],
      enemy: 139,
    }],
  }, {
    name: 'Library Card',
    type: TYPE.USABLE,
    id: 166,
    tiles: [{
      zones: [ ZONE.NO0 ],
      index: 10,
      entities: [ 0x3742, 0x45b8 ],
    }, {
      zones: [ ZONE.CAT ],
      index: 4,
      entities: [ 0x3422, 0x3d02 ],
    }, {
      zones: [ ZONE.ARE ],
      index: 5,
      entities: [ 0x352c, 0x3b78 ],
    }, {
      zones: [ ZONE.RTOP ],
      index: 24,
      entities: [ 0x1e4c, 0x22a2 ],
    }, {
      zones: [ ZONE.RLIB ],
      index: 2,
      entities: [ 0x1a56, 0x2000 ],
    }, {
      zones: [ ZONE.RNO0 ],
      index: 0,
      entities: [ 0x373a, 0x4a10 ],
    }, {
      zones: [ ZONE.RCAT ],
      index: 8,
      entities: [ 0x3040, 0x3b5a ],
    }, {
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a311e ],
      shop: true,
    }],
  }, {
    name: 'Vorpal Blade',
    type: TYPE.WEAPON1,
    id: 163,
    tiles: [{
      addresses: [ 0x0b8f3a ],
      enemy: 107,
    }],
  }, {
    name: 'Crissaegrim',
    type: TYPE.WEAPON1,
    id: 164,
    tiles: [{
      addresses: [ 0x0b920a ],
      enemy: 99,
    }],
  }, {
    name: 'Yusutsuna',
    type: TYPE.WEAPON2,
    id: 165,
    tiles: [{
      addresses: [ 0x0b9d8a ],
      enemy: 108,
    }],
  }, {
    name: 'Alucart Shield',
    type: TYPE.SHIELD,
    id: 167,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.NO0 ],
      index: 1,
      entities: [ 0x3670, 0x44f0 ],
    }],
  }, {
    name: 'Alucart Sword',
    type: TYPE.WEAPON1,
    id: 168,
    tiles: [{
      zones: [ ZONE.NO0 ],
      index: 7,
      entities: [ 0x36a2, 0x4522 ],
    }],
  }, {
    name: 'Cloth Tunic',
    type: TYPE.ARMOR,
    id: 170,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      addresses: [ 0x0b6c02 ],
      enemy: 5,
    }, {
      addresses: [ 0x0b5a7c ],
      enemy: 13,
    }],
  }, {
    name: 'Hide cuirass',
    type: TYPE.ARMOR,
    id: 171,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.NZ0 ],
      index: 0,
      entities: [ 0x2df2, 0x377c ],
    }, {
      addresses: [ 0x0b71a4 ],
      enemy: 47,
    }],
  }, {
    name: 'Bronze Cuirass',
    type: TYPE.ARMOR,
    id: 172,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.LIB ],
      index: 4,
      entities: [ 0x3286, 0x398e ],
    }, {
      addresses: [ 0x0b83a2 ],
      enemy: 12,
    }],
  }, {
    name: 'Iron Cuirass',
    type: TYPE.ARMOR,
    id: 173,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a3196 ],
      shop: true,
    }, {
      addresses: [ 0x0b682a ],
      enemy: 39,
    }, {
      addresses: [ 0x0b5eda ],
      enemy: 65,
    }],
  }, {
    name: 'Steel Cuirass',
    type: TYPE.ARMOR,
    id: 174,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a319e ],
      shop: true,
    }],
  }, {
    name: 'Silver Plate',
    type: TYPE.ARMOR,
    id: 175,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.DAI ],
      index: 10,
      entities: [ 0x2da6, 0x36b6 ],
    }],
  }, {
    name: 'Gold Plate',
    type: TYPE.ARMOR,
    id: 176,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.NZ1 ],
      index: 4,
      entities: [ 0x287c, 0x3288 ],
    }, {
      addresses: [ 0x0b79b2 ],
      enemy: 83,
    }, {
      addresses: [ 0x0b7962 ],
      enemy: 84,
    }, {
      addresses: [ 0x0b7912 ],
      enemy: 85,
    }],
  }, {
    name: 'Platinum Mail',
    type: TYPE.ARMOR,
    id: 177,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.TOP ],
      index: 11,
      entities: [ 0x244e, 0x29b4 ],
    }, {
      addresses: [ 0x0b761a ],
      enemy: 117,
    }],
  }, {
    name: 'Diamond Plate',
    type: TYPE.ARMOR,
    id: 178,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a31a6 ],
      shop: true,
    }],
  }, {
    name: 'Fire Mail',
    type: TYPE.ARMOR,
    id: 179,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.TOP ],
      index: 2,
      entities: [ 0x211a, 0x27a2 ],
    }, {
      addresses: [ 0x0b805a ],
      enemy: 72,
    }, {
      addresses: [ 0x0b64ba ],
      enemy: 89,
    }],
  }, {
    name: 'Lightning Mail',
    type: TYPE.ARMOR,
    id: 180,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.RTOP ],
      index: 23,
      entities: [ 0x1e2e, 0x227a ],
    }, {
      addresses: [ 0x0b64bc ],
      enemy: 89,
    }],
  }, {
    name: 'Ice Mail',
    type: TYPE.ARMOR,
    id: 181,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.NZ1 ],
      index: 9,
      entities: [ 0x2a02, 0x33dc ],
    }, {
      addresses: [ 0x0b6a4c ],
      enemy: 49,
    }],
  }, {
    name: 'Mirror Cuirass',
    type: TYPE.ARMOR,
    id: 182,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.NO1 ],
      index: 1,
      entities: [ 0x36e8, 0x3ec4 ],
    }],
  }, {
    name: 'Spike Breaker',
    type: TYPE.ARMOR,
    id: 183,
    progression: true,
    tiles: [{
      zones: [ ZONE.CAT ],
      index: 16,
      entities: [ 0x342c, 0x3d2a ],
    }],
  }, {
    name: 'Alucard Mail',
    type: TYPE.ARMOR,
    id: 184,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.RNO2 ],
      index: 7,
      entities: [ 0x298e, 0x3172 ],
    }],
  }, {
    name: 'Dark Armor',
    type: TYPE.ARMOR,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    id: 185,
    tiles: [{
      addresses: [ 0x0b8212 ],
      enemy: 126,
    }],
  }, {
    name: 'Healing Mail',
    type: TYPE.ARMOR,
    id: 186,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.NZ1 ],
      index: 6,
      entities: [ 0x2d18, 0x372e ],
    }],
  }, {
    name: 'Holy Mail',
    type: TYPE.ARMOR,
    id: 187,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.NO3, ZONE.NP3 ],
      index: 5,
      entities: [ 0x3ea4, 0x4630, 0x3c44, 0x4380 ],
    }],
  }, {
    name: 'Walk Armor',
    type: TYPE.ARMOR,
    id: 188,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.CAT ],
      index: 2,
      entities: [ 0x2c20, 0x3500 ],
    }],
  }, {
    name: 'Brilliant Mail',
    type: TYPE.ARMOR,
    id: 189,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      addresses: [ 0x0b7a7a ],
      enemy: 118,
    }],
  }, {
    name: 'Mojo Mail',
    type: TYPE.ARMOR,
    id: 190,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      addresses: [ 0x0b87a2 ],
      enemy: 100,
    }],
  }, {
    name: 'Fury Plate',
    type: TYPE.ARMOR,
    id: 191,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.RARE ],
      index: 0,
      entities: [ 0x2446, 0x29e6 ],
    }, {
      addresses: [ 0x0b9d12 ],
      enemy: 112,
    }],
  }, {
    name: 'Dracula Tunic',
    type: TYPE.ARMOR,
    id: 192,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.LIB ],
      addresses: [ 0x047d9370 ],
      noOffset: true,
      librarian: true,
    }],
  }, {
    name: 'God\'s Garb',
    type: TYPE.ARMOR,
    id: 193,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      addresses: [ 0x0b9ea2 ],
      enemy: 143,
    }],
  }, {
    name: 'Axe Lord Armor',
    type: TYPE.ARMOR,
    id: 194,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.LIB ],
      addresses: [ 0x047d9284 ],
      noOffset: true,
      librarian: true,
    }],
  }, {
    name: 'Sunglasses',
    type: TYPE.HELMET,
    id: 196,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.NZ0 ],
      index: 6,
      entities: [ 0x3108, 0x3a60 ],
    }, {
      zones: [ ZONE.ST0 ],
      entities: [ 0x2820, 0x29ba ],
      candle: 0x90,
    }],
  }, {
    name: 'Ballroom Mask',
    type: TYPE.HELMET,
    id: 197,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.CAT ],
      index: 7,
      entities: [ 0x2eaa, 0x3762 ],
    }, {
      addresses: [ 0x0b789a ],
      enemy: 33,
    }],
  }, {
    name: 'Bandana',
    type: TYPE.HELMET,
    id: 198,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.NO4 ],
      index: 11,
      entities: [ 0x3262, 0x42ea ],
    }],
  }, {
    name: 'Felt Hat',
    type: TYPE.HELMET,
    id: 199,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      addresses: [ 0x0b641c ],
      enemy: 36,
    }],
  }, {
    name: 'Velvet Hat',
    type: TYPE.HELMET,
    id: 200,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a3176 ],
      shop: true,
    }],
  }, {
    name: 'Goggles',
    type: TYPE.HELMET,
    id: 201,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.DAI ],
      index: 9,
      entities: [ 0x289c, 0x31f2 ],
    }],
  }, {
    name: 'Leather Hat',
    type: TYPE.HELMET,
    id: 202,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a317e ],
      shop: true,
    }],
  }, {
    name: 'Holy Glasses',
    type: TYPE.HELMET,
    id: 203,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    progression: true,
  }, {
    name: 'Steel Helm',
    type: TYPE.HELMET,
    id: 204,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.NZ1 ],
      index: 5,
      entities: [ 0x2886, 0x3292 ],
    }],
  }, {
    name: 'Stone Mask',
    type: TYPE.HELMET,
    id: 205,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.LIB ],
      index: 1,
      entities: [ 0x3312, 0x39ac ],
    }, {
      addresses: [ 0x0b7ef2 ],
      enemy: 120,
    }],
  }, {
    name: 'Circlet',
    type: TYPE.HELMET,
    id: 206,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a3186 ],
      shop: true,
    }, {
      addresses: [ 0x0b614a ],
      enemy: 20,
    }],
  }, {
    name: 'Gold Circlet',
    type: TYPE.HELMET,
    id: 207,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      addresses: [ 0x0b7fbc ],
      enemy: 82,
    }],
  }, {
    name: 'Ruby Circlet',
    type: TYPE.HELMET,
    id: 208,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.RCAT ],
      index: 17,
      entities: [ 0x25a0, 0x30c4 ],
    }],
  }, {
    name: 'Opal Circlet',
    type: TYPE.HELMET,
    id: 209,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      addresses: [ 0x0b7f1a ],
      enemy: 138,
    }],
  }, {
    name: 'Topaz Circlet',
    type: TYPE.HELMET,
    id: 210,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.LIB ],
      index: 10,
      entities: [ 0x35a6, 0x3c68 ],
    }],
  }, {
    name: 'Beryl Circlet',
    type: TYPE.HELMET,
    id: 211,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.RNO3 ],
      index: 6,
      entities: [ 0x2daa, 0x3462 ],
    }],
  }, {
    name: 'Cat-eye Circlet',
    type: TYPE.HELMET,
    id: 212,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.CAT ],
      index: 0,
      entities: [ 0x2e28, 0x3708 ],
    }],
  }, {
    name: 'Coral Circlet',
    type: TYPE.HELMET,
    id: 213,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      addresses: [ 0x0b752c ],
      enemy: 95,
    }],
  }, {
    name: 'Dragon Helm',
    type: TYPE.HELMET,
    id: 214,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.RNZ1 ],
      index: 5,
      entities: [ 0x2a36, 0x329e ],
    }],
  }, {
    name: 'Silver Crown',
    type: TYPE.HELMET,
    id: 215,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a318e ],
      shop: true,
    }],
  }, {
    name: 'Wizard Hat',
    type: TYPE.HELMET,
    id: 216,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      addresses: [ 0x0b80fc ],
      enemy: 139,
    }],
  }, {
    name: 'Cloth Cape',
    type: TYPE.CLOAK,
    id: 218,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.NZ0 ],
      index: 2,
      entities: [ 0x2f32, 0x388a ],
    }],
  }, {
    name: 'Reverse Cloak',
    type: TYPE.CLOAK,
    id: 219,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a31ae ],
      shop: true,
    }],
  }, {
    name: 'Elven Cloak',
    type: TYPE.CLOAK,
    id: 220,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a31b6 ],
      shop: true,
    }],
  }, {
    name: 'Crystal Cloak',
    type: TYPE.CLOAK,
    id: 221,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.NO4, ZONE.BO3 ],
      index: 2,
      entities: [ 0x3352, 0x43da, 0x1e42, 0x2006 ],
    }],
  }, {
    name: 'Royal Cloak',
    type: TYPE.CLOAK,
    id: 222,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.RTOP ],
      index: 11,
      entities: [ 0x1d16, 0x21a8 ],
    }],
  }, {
    name: 'Blood Cloak',
    type: TYPE.CLOAK,
    id: 223,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.ARE ],
      index: 3,
      entities: [ 0x34a0, 0x3b28 ],
    }],
  }, {
    name: 'Joseph\'s Cloak',
    type: TYPE.CLOAK,
    id: 224,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a31be ],
      shop: true,
    }],
  }, {
    name: 'Twilight Cloak',
    type: TYPE.CLOAK,
    id: 225,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.RDAI ],
      index: 16,
      entities: [ 0x1d7e, 0x26d6 ],
    }],
  }, {
    name: 'Moonstone',
    type: TYPE.ACCESSORY,
    id: 227,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.NO4 ],
      index: 18,
      entities: [ 0x3654, 0x46dc ],
    }],
  }, {
    name: 'Sunstone',
    type: TYPE.ACCESSORY,
    id: 228,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.RNZ1 ],
      index: 8,
      entities: [ 0x2a18, 0x326c ],
    }],
  }, {
    name: 'Bloodstone',
    type: TYPE.ACCESSORY,
    id: 229,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.CAT ],
      index: 8,
      entities: [ 0x2e32, 0x3712 ],
    }],
  }, {
    name: 'Staurolite',
    type: TYPE.ACCESSORY,
    id: 230,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.RLIB ],
      index: 8,
      entities: [ 0x1b82, 0x2122 ],
    }],
  }, {
    name: 'Ring of Pales',
    type: TYPE.ACCESSORY,
    id: 231,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a31ce ],
      shop: true,
    }],
  }, {
    name: 'Zircon',
    type: TYPE.ACCESSORY,
    id: 232,
    salable: true,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.DAI ],
      index: 13,
      entities: [ 0x2f5e, 0x38aa ],
    }, {
      zones: [ ZONE.NO1 ],
      index: 6,
      entities: [ 0x3a9e, 0x4202 ],
    }, {
      zones: [ ZONE.NO4 ],
      index: 9,
      entities: [ 0x329e, 0x4308 ],
    }, {
      zones: [ ZONE.RTOP ],
      index: 2,
      entities: [ 0x1b9a, 0x209a ],
    }, {
      zones: [ ZONE.RNO4 ],
      index: 14,
      entities: [ 0x3b5a, 0x4ac8 ],
    }, {
      zones: [ ZONE.RNO4 ],
      index: 21,
      entities: [ 0x3af6, 0x4a28 ],
    }, {
      zones: [ ZONE.RNO3 ],
      index: 4,
      entities: [ 0x2d96, 0x3476 ],
    }, {
      zones: [ ZONE.DAI ],
      index: 13,
      entities: [ 0x2f5e, 0x38aa ],
    }, {
      zones: [ ZONE.RARE ],
      index: 1,
      entities: [ 0x213a, 0x26e4 ],
    }, {
      addresses: [ 0x0b5cac ],
      enemy: 6,
    }, {
      addresses: [ 0x0b5cfc ],
      enemy: 10,
    }, {
      addresses: [ 0x0b6ca4 ],
      enemy: 53,
    }],
  }, {
    name: 'Aquamarine',
    type: TYPE.ACCESSORY,
    id: 233,
    salable: true,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.DAI ],
      index: 3,
      entities: [ 0x28ba, 0x3328 ],
    }, {
      zones: [ ZONE.RNO2 ],
      index: 6,
      entities: [ 0x2664, 0x2e34 ],
    }, {
      zones: [ ZONE.RARE ],
      index: 4,
      entities: [ 0x2036, 0x2612 ],
    }, {
      addresses: [ 0x0b6ccc ],
      enemy: 52,
    }, {
      addresses: [ 0x0b9644 ],
      enemy: 91,
    }],
  }, {
    name: 'Turquoise',
    type: TYPE.ACCESSORY,
    id: 234,
    salable: true,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.TOP ],
      index: 0,
      entities: [ 0x212e, 0x2842 ],
    }, {
      zones: [ ZONE.RLIB ],
      index: 0,
      entities: [ 0x1a42, 0x1fec ],
    }, {
      zones: [ ZONE.RNZ0 ],
      index: 7,
      entities: [ 0x24d0, 0x2d10 ],
    }, {
      addresses: [ 0x0b7324 ],
      enemy: 116,
    }],
  }, {
    name: 'Onyx',
    type: TYPE.ACCESSORY,
    id: 235,
    salable: true,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.LIB ],
      index: 6,
      entities: [ 0x3786, 0x3f1a ],
    }, {
      zones: [ ZONE.NO4 ],
      index: 22,
      entities: [ 0x3d16, 0x4d6c ],
    }, {
      zones: [ ZONE.NO2 ],
      index: 5,
      entities: [ 0x34b6, 0x3bde ],
    }],
  }, {
    name: 'Garnet',
    type: TYPE.ACCESSORY,
    id: 236,
    salable: true,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.NO1 ],
      index: 3,
      entities: [ 0x3a26, 0x420c ],
    }, {
      zones: [ ZONE.NO2 ],
      index: 12,
      entities: [ 0x3434, 0x3b5c ],
    }, {
      zones: [ ZONE.RTOP ],
      index: 22,
      entities: [ 0x1c6c, 0x1ffa ],
    }, {
      zones: [ ZONE.RNO1 ],
      index: 7,
      entities: [ 0x2576, 0x2ca8 ],
    }, {
      zones: [ ZONE.RNO4 ],
      index: 4,
      entities: [ 0x381c, 0x476c ],
    }, {
      addresses: [ 0x0b632a ],
      enemy: 70,
    }],
  }, {
    name: 'Opal',
    type: TYPE.ACCESSORY,
    id: 237,
    salable: true,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.RLIB ],
      index: 1,
      entities: [ 0x1a4c, 0x1ff6 ],
    }, {
      zones: [ ZONE.RNO4 ],
      index: 11,
      entities: [ 0x3bbe, 0x4b0e ],
    }, {
      zones: [ ZONE.RNO3 ],
      index: 5,
      entities: [ 0x2da0, 0x346c ],
    }, {
      zones: [ ZONE.RNO2 ],
      index: 0,
      entities: [ 0x29f2, 0x31d6 ],
    }],
  }, {
    name: 'Diamond',
    type: TYPE.ACCESSORY,
    id: 238,
    salable: true,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.RNZ1 ],
      index: 6,
      entities: [ 0x29dc, 0x3280 ],
    }, {
      zones: [ ZONE.RNO4 ],
      index: 13,
      entities: [ 0x2d72, 0x3cc2 ],
    }, {
      zones: [ ZONE.RCAT ],
      index: 14,
      entities: [ 0x25be, 0x30e2 ],
    }, {
      zones: [ ZONE.RDAI ],
      index: 3,
      entities: [ 0x1f36, 0x2852 ],
    }],
  }, {
    name: 'Lapis Lazuli',
    type: TYPE.ACCESSORY,
    id: 239,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      addresses: [ 0x0b70da ],
      enemy: 114,
    }],
  }, {
    name: 'Ring of Ares',
    type: TYPE.ACCESSORY,
    id: 240,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.CHI ],
      index: 4,
      entities: [ 0x1d0e, 0x207e ],
    }],
  }, {
    name: 'Gold Ring',
    type: TYPE.ACCESSORY,
    id: 241,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    progression: true,
    tiles: [{
      zones: [ ZONE.NO4 ],
      entities: [ 0x4270, 0x52ee ],
    }],
  }, {
    name: 'Silver Ring',
    type: TYPE.ACCESSORY,
    id: 242,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    progression: true,
    tiles: [{
      zones: [ ZONE.DAI ],
      index: 2,
      entities: [ 0x281a, 0x31c0 ],
    }],
  }, {
    name: 'Ring of Varda',
    type: TYPE.ACCESSORY,
    id: 243,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      addresses: [ 0x0b7e2a ],
      enemy: 67,
    }],
  }, {
    name: 'Ring of Arcana',
    type: TYPE.ACCESSORY,
    id: 244,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.RNZ0 ],
      index: 8,
      entities: [ 0x2368, 0x2c48 ],
    }, {
      zones: [ ZONE.LIB ],
      addresses: [ 0x047d92f0 ],
      noOffset: true,
      librarian: true,
    }],
  }, {
    name: 'Mystic Pendant',
    type: TYPE.ACCESSORY,
    id: 245,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.DAI ],
      index: 4,
      entities: [ 0x28e2, 0x32f6 ],
    }, {
      addresses: [ 0x0b7872 ],
      enemy: 105,
    }],
  }, {
    name: 'Heart Broach',
    type: TYPE.ACCESSORY,
    id: 246,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      addresses: [ 0x0b6b14 ],
      enemy: 141,
    }],
  }, {
    name: 'Necklace of J',
    type: TYPE.ACCESSORY,
    id: 247,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.RCAT ],
      index: 13,
      entities: [ 0x25dc, 0x3100 ],
    }, {
      addresses: [ 0x0b7f1c ],
      enemy: 138,
    }],
  }, {
    name: 'Gauntlet',
    type: TYPE.ACCESSORY,
    id: 248,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a31d6 ],
      shop: true,
    }, {
      addresses: [ 0x0b7e2c ],
      enemy: 67,
    }, {
      addresses: [ 0x0b8754 ],
      enemy: 96,
    }],
  }, {
    name: 'Ankh of Life',
    type: TYPE.ACCESSORY,
    id: 249,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.DAI ],
      index: 0,
      entities: [ 0x2928, 0x32a6 ],
    }],
  }, {
    name: 'Ring of Feanor',
    type: TYPE.ACCESSORY,
    id: 250,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      addresses: [ 0x0b8a22 ],
      enemy: 87,
    }],
  }, {
    name: 'Medal',
    type: TYPE.ACCESSORY,
    id: 251,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a31c6 ],
      shop: true,
    }, {
      addresses: [ 0x0b5b92 ],
      enemy: 62,
    }],
  }, {
    name: 'Talisman',
    type: TYPE.ACCESSORY,
    id: 252,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.RNO3 ],
      index: 9,
      entities: [ 0x2d00, 0x33cc ],
    }, {
      addresses: [ 0x0b6ac2 ],
      enemy: 26,
    }],
  }, {
    name: 'Duplicator',
    type: TYPE.ACCESSORY,
    id: 253,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.LIB ],
      addresses: [ 0x047a31de ],
      shop: true,
    }],
  }, {
    name: 'King\'s Stone',
    type: TYPE.ACCESSORY,
    id: 254,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      addresses: [ 0x0b8ac2 ],
      enemy: 134,
    }],
  }, {
    name: 'Covenant Stone',
    type: TYPE.ACCESSORY,
    id: 255,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      addresses: [ 0x0b8034 ],
      enemy: 137,
    }],
  }, {
    name: 'Nauglamir',
    type: TYPE.ACCESSORY,
    id: 256,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      addresses: [ 0x0b73ea ],
      enemy: 122,
    }],
  }, {
    name: 'Secret Boots',
    type: TYPE.ACCESSORY,
    id: 257,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.NO4 ],
      addresses: [ 0x04c324de, 0x061a73e2 ],
    }],
  }, {
    name: 'Alucart Mail',
    type: TYPE.ARMOR,
    id: 258,
    blacklist: [ 0x0b6b3c, 0x0b6b3a ],
    tiles: [{
      zones: [ ZONE.NO0 ],
      index: 6,
      entities: [ 0x3698, 0x4518 ],
    }],
  }]

  const exports = items
  if (self) {
    self.sotnRando = Object.assign(self.sotnRando || {}, {
      items: exports,
    })
  } else {
    module.exports = exports
  }
})(typeof(self) !== 'undefined' ? self : null)
