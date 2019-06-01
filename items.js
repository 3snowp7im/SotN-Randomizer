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
      zone: ZONE.ST0,
      addresses: [ 0x05341b70, 0x05341e9e ],
      candle: 0x30,
    }, {
      zone: ZONE.ST0,
      addresses: [ 0x05341b8e, 0x05341ea8 ],
      candle: 0x30,
    }, {
      zone: ZONE.ST0,
      addresses: [ 0x05341b98, 0x05341eb2 ],
      candle: 0x20,
    }, {
      zone: ZONE.ST0,
      addresses: [ 0x05341ba2, 0x05341ebc ],
      candle: 0x30,
    }, {
      zone: ZONE.ST0,
      addresses: [ 0x05341bb6, 0x05341ec6 ],
      candle: 0x30,
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c552e, 0x043c5d0e ],
      candle: 0x10,
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c556a, 0x043c5d2c ],
      candle: 0x10,
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c5592, 0x043c5d40 ],
      candle: 0x10,
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c5c4e, 0x043c63fc ],
      candle: 0x10,
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c5c58, 0x043c6406 ],
      candle: 0x10,
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c57b2, 0x043c5e44 ],
      candle: 0x10,
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c57c6, 0x043c5e3a ],
      candle: 0x10,
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c57e4, 0x043c5e26 ],
      candle: 0x10,
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c57f8, 0x043c5e1c ],
      candle: 0x10,
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c5b0e, 0x043c62d0 ],
      candle: 0x10,
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c5b22, 0x043c623a ],
      candle: 0x10,
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c5b40, 0x043c632a ],
      candle: 0x10,
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c5b90, 0x043c6348 ],
      candle: 0x10,
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c59a6, 0x043c61d6 ],
      candle: 0x10,
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c59c4, 0x043c6154 ],
      candle: 0x10,
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c5a00, 0x043c61c2 ],
      candle: 0x10,
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c5a1e, 0x043c6140 ],
      candle: 0x10,
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c58e8, 0x043c60aa ],
      candle: 0x10,
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c58fc, 0x043c60a0 ],
      candle: 0x10,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04492cfe, 0x0449370e ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04492d08, 0x04493718 ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04492cae, 0x044936be ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04492cc2, 0x044936b4 ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04493342, 0x04493d84 ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x0449334c, 0x04493d8e ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x0449337e, 0x04493da2 ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04493388, 0x04493d98 ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04492db2, 0x044937a4 ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04492c2c, 0x04493632 ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x044933e2, 0x04493dfc ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x044933f6, 0x04493df2 ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x0449340a, 0x04493e2e ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x0449341e, 0x04493e1a ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04493446, 0x04493e06 ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x044930a4, 0x04493ac8 ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x044930cc, 0x04493ab4 ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04492bb4, 0x044935c4 ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04492bbe, 0x044935ec ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04493108, 0x04493b90 ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x0449311c, 0x04493b9a ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x0449314e, 0x04493b54 ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04493158, 0x04493bc2 ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04493194, 0x04493bae ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x0449319e, 0x04493b18 ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x044931bc, 0x04493b40 ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x044931c6, 0x04493bb8 ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x044934a0, 0x04493ea6 ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x044934aa, 0x04493e9c ],
      candle: 0x20,
    }, {
      zone: ZONE.CHI,
      addresses: [ 0x045ea9ae, 0x045ead3c ],
      candle: 0x00,
    }, {
      zone: ZONE.CHI,
      addresses: [ 0x045ea9cc, 0x045ead5a ],
      candle: 0x10,
    }, {
      zone: ZONE.CHI,
      addresses: [ 0x045eaa08, 0x045ead8c ],
      candle: 0x00,
    }, {
      zone: ZONE.CHI,
      addresses: [ 0x045eaa30, 0x045eada0 ],
      candle: 0x00,
    }, {
      zone: ZONE.DAI,
      addresses: [ 0x04678fd6, 0x04679a98 ],
      candle: 0x10,
    }, {
      zone: ZONE.DAI,
      addresses: [ 0x04678fea, 0x04679aa2 ],
      candle: 0x10,
    }, {
      zone: ZONE.DAI,
      addresses: [ 0x0467904e, 0x04679ac0 ],
      candle: 0x10,
    }, {
      zone: ZONE.DAI,
      addresses: [ 0x04679102, 0x04679bb0 ],
      candle: 0x10,
    }, {
      zone: ZONE.DAI,
      addresses: [ 0x0467913e, 0x04679bc4 ],
      candle: 0x10,
    }, {
      zone: ZONE.DAI,
      addresses: [ 0x046791ac, 0x04679c6e ],
      candle: 0x10,
    }, {
      zone: ZONE.DAI,
      addresses: [ 0x04678e5a, 0x046798ae ],
      candle: 0x00,
    }, {
      zone: ZONE.DAI,
      addresses: [ 0x04679256, 0x04679dcc ],
      candle: 0x00,
    }, {
      zone: ZONE.DAI,
      addresses: [ 0x04679260, 0x04679e12 ],
      candle: 0x00,
    }, {
      zone: ZONE.DAI,
      addresses: [ 0x0467926a, 0x04679f6a ],
      candle: 0x00,
    }, {
      zone: ZONE.DAI,
      addresses: [ 0x046793b4, 0x04679f74 ],
      candle: 0x00,
    }, {
      zone: ZONE.DAI,
      addresses: [ 0x046793be, 0x04679fb0 ],
      candle: 0x00,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a5932, 0x047a6228 ],
      candle: 0x00,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a5978, 0x047a614c ],
      candle: 0x00,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a59b4, 0x047a6106 ],
      candle: 0x00,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a59fa, 0x047a6156 ],
      candle: 0x00,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a5a04, 0x047a617e ],
      candle: 0x00,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a5b52, 0x047a6160 ],
      candle: 0x00,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a5b70, 0x047a60fc ],
      candle: 0x00,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a5bac, 0x047a60f2 ],
      candle: 0x00,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a5432, 0x047a5c06 ],
      candle: 0x00,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a546e, 0x047a5c10 ],
      candle: 0x00,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a5766, 0x047a5f4e ],
      candle: 0x00,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a57de, 0x047a5fc6 ],
      candle: 0x00,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a55f4, 0x047a5dfa ],
      candle: 0x00,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a5608, 0x047a5e9a ],
      candle: 0x00,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a5676, 0x047a5d8c ],
      candle: 0x00,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a5694, 0x047a5e22 ],
      candle: 0x00,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a56a8, 0x047a5eb8 ],
      candle: 0x00,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a56e4, 0x047a5e18 ],
      candle: 0x00,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a56f8, 0x047a5ec2 ],
      candle: 0x00,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a5838, 0x047a6016 ],
      candle: 0x00,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a5860, 0x047a6020 ],
      candle: 0x00,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a58d8, 0x047a608e ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fce62, 0x048fe0c8 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fce9e, 0x048fe0b4 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fcea8, 0x048fe0aa ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fceda, 0x048fe096 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fcee4, 0x048fdf6a ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fceee, 0x048fe08c ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fcf02, 0x048fdf60 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fcf2a, 0x048fe082 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fcf34, 0x048fdf56 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fcf48, 0x048fe078 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fcf70, 0x048fe064 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fcf7a, 0x048fdf42 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fcf8e, 0x048fe05a ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fcfac, 0x048fe046 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fcfd4, 0x048fdf24 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fcff2, 0x048fdf1a ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd024, 0x048fe118 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd15e, 0x048fe12c ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd172, 0x048fe0fa ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd186, 0x048fe122 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd190, 0x048fe136 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd1c2, 0x048fe21c ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd1cc, 0x048fe23a ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd1ea, 0x048fe15e ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd208, 0x048fe168 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd21c, 0x048fe1b8 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd226, 0x048fe1c2 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd230, 0x048fe1fe ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd23a, 0x048fe24e ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd244, 0x048fe172 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd258, 0x048fe1e0 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd262, 0x048fe17c ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd26c, 0x048fe1ea ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd280, 0x048fe208 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd28a, 0x048fe258 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd2bc, 0x048fe190 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd2e4, 0x048fe1d6 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd2f8, 0x048fe26c ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd3d4, 0x048fe4b4 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd3f2, 0x048fe4c8 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd3fc, 0x048fe4d2 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd41a, 0x048fe4fa ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd42e, 0x048fe50e ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd438, 0x048fe518 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd44c, 0x048fe522 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd456, 0x048fe52c ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd74e, 0x048fe82e ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd78a, 0x048fe842 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd316, 0x048fe428 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd32a, 0x048fe40a ],
      candle: 0x20,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd33e, 0x048fe478 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd370, 0x048fe464 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd38e, 0x048fe400 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd398, 0x048fe450 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd492, 0x048fe572 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd4d8, 0x048fe586 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd69a, 0x048fe770 ],
      candle: 0x20,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd6a4, 0x048fe798 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd6b8, 0x048fe766 ],
      candle: 0x20,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd6c2, 0x048fe7c0 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd6ea, 0x048fe7ca ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd6fe, 0x048fe77a ],
      candle: 0x20,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd578, 0x048fe680 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd596, 0x048fe694 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd5aa, 0x048fe6a8 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd5be, 0x048fe6b2 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd5c8, 0x048fe6bc ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd5fa, 0x048fe6c6 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd604, 0x048fe6d0 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd622, 0x048fe6e4 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd62c, 0x048fe6ee ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd640, 0x048fe6f8 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fc96a, 0x048fd91a ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fc97e, 0x048fd924 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd500, 0x048fe5fe ],
      candle: 0x20,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd514, 0x048fe5e0 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd852, 0x048fe928 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd85c, 0x048fe946 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO1,
      addresses: [ 0x049d5ac8, 0x049d63b6 ],
      candle: 0x50,
    }, {
      zone: ZONE.NO1,
      addresses: [ 0x049d5974, 0x049d62bc ],
      candle: 0x50,
    }, {
      zone: ZONE.NO1,
      addresses: [ 0x049d5988, 0x049d60d8 ],
      candle: 0x50,
    }, {
      zone: ZONE.NO1,
      addresses: [ 0x049d5992, 0x049d62c6 ],
      candle: 0x50,
    }, {
      zone: ZONE.NO1,
      addresses: [ 0x049d59f6, 0x049d624e ],
      candle: 0x50,
    }, {
      zone: ZONE.NO1,
      addresses: [ 0x049d55ce, 0x049d5eee ],
      candle: 0x60,
    }, {
      zone: ZONE.NO1,
      addresses: [ 0x049d55ec, 0x049d5eda ],
      candle: 0x60,
    }, {
      zone: ZONE.NO1,
      addresses: [ 0x049d5c6c, 0x049d664a ],
      candle: 0x50,
    }, {
      zone: ZONE.NO1,
      addresses: [ 0x049d5c76, 0x049d65f0 ],
      candle: 0x50,
    }, {
      zone: ZONE.NO1,
      addresses: [ 0x049d5c80, 0x049d6582 ],
      candle: 0x50,
    }, {
      zone: ZONE.NO1,
      addresses: [ 0x049d5d66, 0x049d64f6 ],
      candle: 0x50,
    }, {
      zone: ZONE.NO1,
      addresses: [ 0x049d5d7a, 0x049d64d8 ],
      candle: 0x50,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa4646, 0x04aa4f2a ],
      candle: 0x00,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa46b4, 0x04aa4ea8 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa46c8, 0x04aa4f0c ],
      candle: 0x00,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa46f0, 0x04aa4f16 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa419c, 0x04aa49fe ],
      candle: 0x30,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa41b0, 0x04aa4a08 ],
      candle: 0x30,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa41d8, 0x04aa4a26 ],
      candle: 0x30,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa405c, 0x04aa48e6 ],
      candle: 0x40,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa4084, 0x04aa48d2 ],
      candle: 0x40,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa4098, 0x04aa48c8 ],
      candle: 0x40,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa44c0, 0x04aa4c2e ],
      candle: 0x10,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa44de, 0x04aa4c38 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa4542, 0x04aa4c42 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa454c, 0x04aa4ba2 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa457e, 0x04aa4dea ],
      candle: 0x10,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa4588, 0x04aa4b98 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa40fc, 0x04aa495e ],
      candle: 0x60,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa4110, 0x04aa4968 ],
      candle: 0x60,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa414c, 0x04aa49b8 ],
      candle: 0x20,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa4160, 0x04aa49c2 ],
      candle: 0x20,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa423c, 0x04aa4ad0 ],
      candle: 0x60,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa425a, 0x04aa4a9e ],
      candle: 0x40,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa4264, 0x04aa4a94 ],
      candle: 0x40,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa42a0, 0x04aa4af8 ],
      candle: 0x60,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa42aa, 0x04aa4aee ],
      candle: 0x60,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa42dc, 0x04aa4ada ],
      candle: 0x60,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6b332, 0x04b6bbe4 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6b346, 0x04b6bbee ],
      candle: 0x00,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6b350, 0x04b6bbf8 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6b36e, 0x04b6bc02 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6b382, 0x04b6bc0c ],
      candle: 0x00,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6b3a0, 0x04b6bc16 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6ac58, 0x04b6b500 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6ac62, 0x04b6b51e ],
      candle: 0x00,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6ac6c, 0x04b6b514 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6ad2a, 0x04b6b5fa ],
      candle: 0x00,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6ad3e, 0x04b6b5e6 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6ad48, 0x04b6b5dc ],
      candle: 0x00,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6ac8a, 0x04b6b546 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6b210, 0x04b6bb30 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6b238, 0x04b6bad6 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6b2c4, 0x04b6bae0 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6b2d8, 0x04b6bb26 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6ad8e, 0x04b6b654 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6ada2, 0x04b6b65e ],
      candle: 0x00,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6adb6, 0x04b6b668 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6adc0, 0x04b6b690 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6add4, 0x04b6b69a ],
      candle: 0x00,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6adde, 0x04b6b672 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6adf2, 0x04b6b67c ],
      candle: 0x00,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6ae06, 0x04b6b686 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6b06c, 0x04b6b91e ],
      candle: 0x00,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6b094, 0x04b6b982 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6b0bc, 0x04b6b978 ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f922e, 0x053f9a90 ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f9238, 0x053f9a9a ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f9274, 0x053f9aae ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f92a6, 0x053f9ac2 ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f8b18, 0x053f9370 ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f8b22, 0x053f938e ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f8b2c, 0x053f9384 ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f8bf4, 0x053f946a ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f8c08, 0x053f9456 ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f8c1c, 0x053f944c ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f8b4a, 0x053f93b6 ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f910c, 0x053f99e6 ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f912a, 0x053f9848 ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f91c0, 0x053f9852 ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f91d4, 0x053f99dc ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f8c6c, 0x053f94d8 ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f8c80, 0x053f94e2 ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f8c94, 0x053f9514 ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f8ca8, 0x053f94f6 ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f8cb2, 0x053f9500 ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f8cc6, 0x053f950a ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f8e1a, 0x053f9672 ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f8e4c, 0x053f96ea ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f8e74, 0x053f96e0 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c341a4, 0x04c35496 ],
      candle: 0x50,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c341c2, 0x04c354b4 ],
      candle: 0x50,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c344ce, 0x04c357ac ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c344ec, 0x04c357b6 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c344f6, 0x04c357d4 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c3441a, 0x04c35770 ],
      candle: 0x50,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c3442e, 0x04c356da ],
      candle: 0x50,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c34442, 0x04c356ee ],
      candle: 0x50,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c34456, 0x04c35752 ],
      candle: 0x50,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c34488, 0x04c3569e ],
      candle: 0x50,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c34492, 0x04c356b2 ],
      candle: 0x50,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c346f4, 0x04c358ce ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c346fe, 0x04c358c4 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c3433e, 0x04c3561c ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c34352, 0x04c35626 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c3430c, 0x04c355fe ],
      candle: 0x60,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c34e50, 0x04c36138 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c34e5a, 0x04c36142 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c34eb4, 0x04c36160 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c34f0e, 0x04c361f6 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c351f6, 0x04c36498 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c35278, 0x04c364ac ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c3528c, 0x04c364b6 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c35012, 0x04c36434 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c345aa, 0x04c35892 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c34ab8, 0x04c35dbe ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c34b94, 0x04c35da0 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c34b9e, 0x04c35dd2 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c34c20, 0x04c35ed6 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c34c48, 0x04c35ecc ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c34d60, 0x04c35fd0 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c34e28, 0x04c35fee ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c34e32, 0x04c35ff8 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c348e2, 0x04c35b66 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c348ec, 0x04c35b5c ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c34978, 0x04c35c7e ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c34370, 0x04c3566c ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c34398, 0x04c35658 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c34280, 0x04c35568 ],
      candle: 0x60,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c34294, 0x04c35586 ],
      candle: 0x60,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c342b2, 0x04c35572 ],
      candle: 0x60,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b420c, 0x054b4d88 ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b4216, 0x054b4d9c ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b423e, 0x054b4e0a ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b425c, 0x054b4dd8 ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b43aa, 0x054b4e14 ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b43d2, 0x054b4de2 ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b41a8, 0x054b4d4c ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b41c6, 0x054b4d42 ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b4108, 0x054b4b7c ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b4112, 0x054b4b86 ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b43fa, 0x054b4e6e ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b4418, 0x054b4e64 ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b4162, 0x054b4d06 ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b4180, 0x054b4cfc ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b4090, 0x054b4afa ],
      candle: 0x00,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b40c2, 0x054b4b22 ],
      candle: 0x00,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3b5e, 0x054b45b4 ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3b72, 0x054b45e6 ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3bae, 0x054b4618 ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3bb8, 0x054b4622 ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3bfe, 0x054b4654 ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3c58, 0x054b46a4 ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3c62, 0x054b46ae ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3c6c, 0x054b46c2 ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3c9e, 0x054b4730 ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3cc6, 0x054b471c ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3f64, 0x054b49ec ],
      candle: 0x00,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3fc8, 0x054b49d8 ],
      candle: 0x00,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3fd2, 0x054b49e2 ],
      candle: 0x00,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3d3e, 0x054b47e4 ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3da2, 0x054b4820 ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3db6, 0x054b480c ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3e1a, 0x054b4898 ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3e88, 0x054b48d4 ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b445e, 0x054b4edc ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b4468, 0x054b4ed2 ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b4472, 0x054b4ee6 ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b4486, 0x054b4efa ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b44ae, 0x054b4f22 ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b44cc, 0x054b4f18 ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3cf8, 0x054b4776 ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x055757f0, 0x05576372 ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x0557580e, 0x05576336 ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x05575822, 0x0557632c ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x0557582c, 0x0557635e ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x055757be, 0x055762fa ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x055757d2, 0x05576304 ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x0557566a, 0x05576228 ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x05575692, 0x055762b4 ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x055756ba, 0x0557620a ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x055756ce, 0x055762a0 ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x05575700, 0x05576296 ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x05575732, 0x05576278 ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x0557576e, 0x0557625a ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x05575796, 0x05576200 ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x05574e3c, 0x055759fa ],
      candle: 0x40,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x05574e46, 0x05575a54 ],
      candle: 0x40,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x05575386, 0x05576034 ],
      candle: 0x50,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x05575430, 0x0557612e ],
      candle: 0x60,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x0557544e, 0x05575f6c ],
      candle: 0x00,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x05575462, 0x05575f94 ],
      candle: 0x00,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x055754c6, 0x05575f8a ],
      candle: 0x00,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x055754ee, 0x05575f58 ],
      candle: 0x00,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x055754f8, 0x05575ff8 ],
      candle: 0x50,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x05575520, 0x0557611a ],
      candle: 0x60,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x0557553e, 0x05575f4e ],
      candle: 0x00,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x05575552, 0x05575f76 ],
      candle: 0x00,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x05574fe0, 0x05575c88 ],
      candle: 0x40,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x0557506c, 0x05575d3c ],
      candle: 0x40,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x05575076, 0x05575d28 ],
      candle: 0x40,
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x05610d86, 0x05611656 ],
      candle: 0x60,
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x05610dcc, 0x05611660 ],
      candle: 0x60,
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x05610dfe, 0x05611674 ],
      candle: 0x60,
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x05610e08, 0x0561167e ],
      candle: 0x60,
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x05610e26, 0x056113dc ],
      candle: 0x30,
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x05610e62, 0x056113e6 ],
      candle: 0x30,
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x05610e6c, 0x05611692 ],
      candle: 0x60,
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x05610e80, 0x056113f0 ],
      candle: 0x20,
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x05610e94, 0x0561169c ],
      candle: 0x60,
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x05610ea8, 0x056113fa ],
      candle: 0x30,
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x05610ebc, 0x056116b0 ],
      candle: 0x60,
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x05610eda, 0x056116ba ],
      candle: 0x60,
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x05610ee4, 0x0561144a ],
      candle: 0x60,
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x05610eee, 0x05611404 ],
      candle: 0x30,
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x05610f3e, 0x056116ce ],
      candle: 0x60,
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x05610f70, 0x05611610 ],
      candle: 0x60,
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x05611010, 0x056115fc ],
      candle: 0x60,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x05753314, 0x05753a16 ],
      candle: 0x10,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x0575333c, 0x05753a02 ],
      candle: 0x10,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x0575336e, 0x057539e4 ],
      candle: 0x10,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x05752f4a, 0x057534fe ],
      candle: 0x10,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x05752f54, 0x057534f4 ],
      candle: 0x10,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x05752d20, 0x057533e6 ],
      candle: 0x10,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x05752d2a, 0x057533f0 ],
      candle: 0x10,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x05752d70, 0x05753404 ],
      candle: 0x10,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x05752eaa, 0x0575340e ],
      candle: 0x10,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x057530ee, 0x0575387c ],
      candle: 0x10,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x057530f8, 0x057536a2 ],
      candle: 0x10,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x057531d4, 0x057538c2 ],
      candle: 0x10,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x0575322e, 0x057538a4 ],
      candle: 0x10,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x05753044, 0x05753634 ],
      candle: 0x10,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x0575306c, 0x057535bc ],
      candle: 0x10,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x05753094, 0x05753648 ],
      candle: 0x10,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x057530a8, 0x057535d0 ],
      candle: 0x10,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x05752fb8, 0x0575354e ],
      candle: 0x10,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x05752fcc, 0x05753558 ],
      candle: 0x10,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfcd6e, 0x04cfdafc ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfcea8, 0x04cfdaf2 ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfcd46, 0x04cfdaca ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfcd50, 0x04cfdad4 ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfd40c, 0x04cfe19a ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfd42a, 0x04cfe1a4 ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfd466, 0x04cfe190 ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfd470, 0x04cfe186 ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfd1fa, 0x04cfde76 ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfcce2, 0x04cfda66 ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfd4a2, 0x04cfe21c ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfd506, 0x04cfe230 ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfd592, 0x04cfe244 ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfd5ec, 0x04cfe24e ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfd650, 0x04cfe258 ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfd164, 0x04cfddd6 ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfd18c, 0x04cfddc2 ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfcca6, 0x04cfd9bc ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfccb0, 0x04cfda3e ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfcf66, 0x04cfdbe2 ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfcf70, 0x04cfdc14 ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfcf7a, 0x04cfdc50 ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfcf84, 0x04cfdbd8 ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfcfb6, 0x04cfdba6 ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfcfca, 0x04cfdc28 ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfcfd4, 0x04cfdbc4 ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfcfe8, 0x04cfdbba ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfd7f8, 0x04cfe44c ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfd802, 0x04cfe456 ],
      candle: 0x20,
    }, {
      zone: ZONE.RCHI,
      addresses: [ 0x04da6674, 0x04da6aca ],
      candle: 0x10,
    }, {
      zone: ZONE.RCHI,
      addresses: [ 0x04da66ba, 0x04da6af2 ],
      candle: 0x00,
    }, {
      zone: ZONE.RCHI,
      addresses: [ 0x04da66e2, 0x04da6b42 ],
      candle: 0x00,
    }, {
      zone: ZONE.RCHI,
      addresses: [ 0x04da671e, 0x04da6b56 ],
      candle: 0x00,
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e3398c, 0x04e3445a ],
      candle: 0x10,
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e339dc, 0x04e3443c ],
      candle: 0x10,
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e339fa, 0x04e34432 ],
      candle: 0x10,
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e33a5e, 0x04e3450e ],
      candle: 0x10,
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e33a86, 0x04e344fa ],
      candle: 0x10,
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e33afe, 0x04e34586 ],
      candle: 0x10,
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e336d6, 0x04e3437e ],
      candle: 0x00,
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e33b8a, 0x04e3468a ],
      candle: 0x00,
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e33b94, 0x04e34630 ],
      candle: 0x00,
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e33d06, 0x04e3472a ],
      candle: 0x00,
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e33d10, 0x04e346da ],
      candle: 0x00,
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e33d1a, 0x04e34680 ],
      candle: 0x00,
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee4100, 0x04ee48f2 ],
      candle: 0x00,
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee4146, 0x04ee48fc ],
      candle: 0x00,
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee415a, 0x04ee4898 ],
      candle: 0x00,
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee4178, 0x04ee4884 ],
      candle: 0x00,
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee4182, 0x04ee4852 ],
      candle: 0x00,
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee41a0, 0x04ee48d4 ],
      candle: 0x00,
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee41c8, 0x04ee488e ],
      candle: 0x00,
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee4236, 0x04ee47d0 ],
      candle: 0x00,
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee402e, 0x04ee4708 ],
      candle: 0x00,
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee4038, 0x04ee46fe ],
      candle: 0x00,
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee4056, 0x04ee4730 ],
      candle: 0x00,
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee4506, 0x04ee4be0 ],
      candle: 0x00,
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee42cc, 0x04ee49f6 ],
      candle: 0x00,
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee42fe, 0x04ee4a46 ],
      candle: 0x00,
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee4326, 0x04ee49ec ],
      candle: 0x00,
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee4330, 0x04ee4a50 ],
      candle: 0x00,
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee4344, 0x04ee4ab4 ],
      candle: 0x00,
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee43b2, 0x04ee49ce ],
      candle: 0x00,
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee43ee, 0x04ee4aa0 ],
      candle: 0x00,
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee4484, 0x04ee4b7c ],
      candle: 0x00,
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee44a2, 0x04ee4b72 ],
      candle: 0x00,
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee4420, 0x04ee4b04 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f8886c, 0x04f89e28 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88894, 0x04f89e32 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f888a8, 0x04f89b2c ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f8890c, 0x04f89dc4 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88916, 0x04f89b40 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88934, 0x04f89b4a ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88abe, 0x04f89b5e ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88adc, 0x04f89b68 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88b04, 0x04f89de2 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88b22, 0x04f89dd8 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88b54, 0x04f89dec ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88b5e, 0x04f89b72 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88b9a, 0x04f89b7c ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88bea, 0x04f89b90 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88bfe, 0x04f89b9a ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f887b8, 0x04f89ad2 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f887c2, 0x04f89ab4 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f887cc, 0x04f89aa0 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f887d6, 0x04f89a8c ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f887fe, 0x04f89aaa ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88808, 0x04f89a96 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88c4e, 0x04f89f9a ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88c62, 0x04f89f18 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88c6c, 0x04f89ff4 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88ca8, 0x04f89f5e ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88cb2, 0x04f89f2c ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88cbc, 0x04f89f7c ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88cc6, 0x04f89fe0 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88cd0, 0x04f89f86 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88cda, 0x04f89fd6 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88cf8, 0x04f89fa4 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88d02, 0x04f89f54 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88d0c, 0x04f89f22 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88d20, 0x04f89fae ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88d2a, 0x04f89fcc ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88d48, 0x04f89fc2 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88d5c, 0x04f89f4a ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88d66, 0x04f89f36 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f8877c, 0x04f89a46 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88786, 0x04f89a3c ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88da2, 0x04f8a080 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88dc0, 0x04f8a076 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88df2, 0x04f8a06c ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88e06, 0x04f8a062 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88e1a, 0x04f8a04e ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f897d8, 0x04f8aade ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f8980a, 0x04f8aaca ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f89544, 0x04f8a89a ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f8954e, 0x04f8a82c ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f89576, 0x04f8a804 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f895c6, 0x04f8a84a ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f895d0, 0x04f8a7fa ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f895da, 0x04f8a886 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f895f8, 0x04f8a872 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f89490, 0x04f8a764 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f89508, 0x04f8a750 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f89220, 0x04f8a624 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f89234, 0x04f8a660 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f89248, 0x04f8a61a ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f893aa, 0x04f8a610 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f893b4, 0x04f8a66a ],
      candle: 0x20,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f893dc, 0x04f8a64c ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f893e6, 0x04f8a656 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f893fa, 0x04f8a62e ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f89652, 0x04f8a908 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f8967a, 0x04f8a91c ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f896a2, 0x04f8a930 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f896b6, 0x04f8a93a ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f896ca, 0x04f8a944 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f89710, 0x04f8a94e ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f8971a, 0x04f8a958 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f89756, 0x04f8a96c ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f89774, 0x04f8a976 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f89788, 0x04f8a980 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88830, 0x04f89b04 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88844, 0x04f89afa ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f89422, 0x04f8a6f6 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f89436, 0x04f8a700 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f89454, 0x04f8a6ec ],
      candle: 0x20,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f898c8, 0x04f8aba6 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f898d2, 0x04f8ab9c ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f898dc, 0x04f8abb0 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f898e6, 0x04f8ab92 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO1,
      addresses: [ 0x05051a32, 0x050521a0 ],
      candle: 0x50,
    }, {
      zone: ZONE.RNO1,
      addresses: [ 0x05051a5a, 0x050521fa ],
      candle: 0x50,
    }, {
      zone: ZONE.RNO1,
      addresses: [ 0x05051a64, 0x05052114 ],
      candle: 0x50,
    }, {
      zone: ZONE.RNO1,
      addresses: [ 0x05051adc, 0x0505210a ],
      candle: 0x50,
    }, {
      zone: ZONE.RNO1,
      addresses: [ 0x05051c80, 0x05052492 ],
      candle: 0x60,
    }, {
      zone: ZONE.RNO1,
      addresses: [ 0x05051ca8, 0x050524a6 ],
      candle: 0x60,
    }, {
      zone: ZONE.RNO1,
      addresses: [ 0x05051dfc, 0x050527a8 ],
      candle: 0x50,
    }, {
      zone: ZONE.RNO1,
      addresses: [ 0x05051e06, 0x0505276c ],
      candle: 0x50,
    }, {
      zone: ZONE.RNO1,
      addresses: [ 0x05051e7e, 0x05052622 ],
      candle: 0x50,
    }, {
      zone: ZONE.RNO1,
      addresses: [ 0x05051e88, 0x05052686 ],
      candle: 0x50,
    }, {
      zone: ZONE.RNO1,
      addresses: [ 0x05051e92, 0x050526e0 ],
      candle: 0x50,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa294, 0x050fabbc ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa2a8, 0x050fabb2 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa2da, 0x050fac02 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa2ee, 0x050fabf8 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa302, 0x050fac5c ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa348, 0x050fac16 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa384, 0x050facac ],
      candle: 0x30,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa3b6, 0x050fac8e ],
      candle: 0x30,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa3d4, 0x050fac84 ],
      candle: 0x30,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa424, 0x050fad24 ],
      candle: 0x40,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa438, 0x050fad2e ],
      candle: 0x40,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa460, 0x050fad42 ],
      candle: 0x40,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa528, 0x050fb106 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa596, 0x050fb110 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa9a0, 0x050fb2aa ],
      candle: 0x60,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa9aa, 0x050fb2a0 ],
      candle: 0x60,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa9dc, 0x050fb2f0 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa9f0, 0x050fb2e6 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050faa2c, 0x050fb336 ],
      candle: 0x60,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050faa7c, 0x050fb34a ],
      candle: 0x60,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050faa86, 0x050fb354 ],
      candle: 0x60,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050faaea, 0x050fb39a ],
      candle: 0x40,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050faafe, 0x050fb3a4 ],
      candle: 0x40,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fab12, 0x050fb372 ],
      candle: 0x60,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051aff86, 0x051b07c8 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051affd6, 0x051b07b4 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051b003a, 0x051b0670 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051b004e, 0x051b0666 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051af9ce, 0x051b01ca ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051af9d8, 0x051b01de ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051af9e2, 0x051b01f2 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051b008a, 0x051b087c ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051b009e, 0x051b0886 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051b00d0, 0x051b089a ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051afa14, 0x051b0210 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051afc4e, 0x051b0468 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051afc58, 0x051b04ae ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051afc8a, 0x051b04a4 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051afc94, 0x051b0454 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051afeb4, 0x051b05c6 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051afed2, 0x051b05bc ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051aff04, 0x051b05b2 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051aff36, 0x051b059e ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051aff4a, 0x051b0594 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051af99c, 0x051b0198 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051af9a6, 0x051b01a2 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051af9b0, 0x051b01ac ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051afb7c, 0x051b0378 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051afb9a, 0x051b0382 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051afbd6, 0x051b03d2 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526ec10, 0x0526fdc0 ],
      candle: 0x50,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526ec24, 0x0526fdd4 ],
      candle: 0x50,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526dfa0, 0x0526f048 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526dfaa, 0x0526f020 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526dfb4, 0x0526f03e ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526dd94, 0x0526efe4 ],
      candle: 0x50,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526dda8, 0x0526ef76 ],
      candle: 0x50,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526ddee, 0x0526efd0 ],
      candle: 0x50,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526de0c, 0x0526efbc ],
      candle: 0x50,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526de34, 0x0526ef62 ],
      candle: 0x50,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526e04a, 0x0526f2f4 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526e054, 0x0526f2ea ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526dcfe, 0x0526eed6 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526dd1c, 0x0526eecc ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526dc86, 0x0526ee2c ],
      candle: 0x60,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526e626, 0x0526f81c ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526e680, 0x0526f830 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526e68a, 0x0526f826 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526e9b8, 0x0526fbea ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526e9cc, 0x0526fbe0 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526ea26, 0x0526fbcc ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526e90e, 0x0526f984 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526ecce, 0x0526fe74 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526e1bc, 0x0526f36c ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526e1d0, 0x0526f362 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526e216, 0x0526f416 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526e234, 0x0526f434 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526e2e8, 0x0526f402 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526e31a, 0x0526f588 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526e32e, 0x0526f57e ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526e518, 0x0526f650 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526e5ae, 0x0526f79a ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526e5c2, 0x0526f7a4 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526dd44, 0x0526eef4 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526dd76, 0x0526ef08 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526dbf0, 0x0526ede6 ],
      candle: 0x60,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526dc2c, 0x0526edaa ],
      candle: 0x60,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526dc4a, 0x0526eddc ],
      candle: 0x60,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904e68, 0x059059c6 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904e72, 0x059059da ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904eb8, 0x05905a52 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904ee0, 0x05905a0c ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904ef4, 0x05905a48 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904f12, 0x05905a02 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904e2c, 0x0590585a ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904e4a, 0x05905850 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904d8c, 0x059057a6 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904d96, 0x059057b0 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x0590506a, 0x05905a98 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05905088, 0x05905a8e ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904de6, 0x05905814 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904e04, 0x0590580a ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904d3c, 0x05905742 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904d64, 0x05905756 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x059048d2, 0x059052ec ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x059048e6, 0x059052ba ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904936, 0x0590533c ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904940, 0x05905332 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904972, 0x05905382 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x059049d6, 0x05905418 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x059049e0, 0x05905404 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x059049ea, 0x059053dc ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904a3a, 0x05905468 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904a58, 0x05905472 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904c60, 0x059056ac ],
      candle: 0x00,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904c74, 0x059056a2 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904ce2, 0x059056b6 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904ada, 0x059054f4 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904aee, 0x05905508 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904b48, 0x0590553a ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904b8e, 0x059055c6 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904bf2, 0x059055f8 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x059050a6, 0x05905aca ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x059050c4, 0x05905ade ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x059050ce, 0x05905ae8 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x059050d8, 0x05905ad4 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05905100, 0x05905b24 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x0590511e, 0x05905b2e ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904ab2, 0x059054cc ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be412, 0x059bedaa ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be41c, 0x059beddc ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be430, 0x059bede6 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be44e, 0x059bedbe ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be3cc, 0x059bed6e ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be3e0, 0x059bed64 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be25a, 0x059becb0 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be26e, 0x059bec2e ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be2f0, 0x059bec4c ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be336, 0x059bec6a ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be34a, 0x059bec74 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be37c, 0x059becba ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be386, 0x059bec88 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be3a4, 0x059bec9c ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059bdc8e, 0x059be536 ],
      candle: 0x40,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059bdcb6, 0x059be590 ],
      candle: 0x40,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be16a, 0x059beb8e ],
      candle: 0x60,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be19c, 0x059beb34 ],
      candle: 0x50,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be1d8, 0x059beb7a ],
      candle: 0x60,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be228, 0x059beb0c ],
      candle: 0x50,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059bdeea, 0x059be6c6 ],
      candle: 0x40,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be002, 0x059be940 ],
      candle: 0x40,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be00c, 0x059be954 ],
      candle: 0x40,
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e1802, 0x057e1cee ],
      candle: 0x60,
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e1816, 0x057e1ce4 ],
      candle: 0x60,
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e1820, 0x057e1cda ],
      candle: 0x60,
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e1834, 0x057e1cd0 ],
      candle: 0x60,
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e1852, 0x057e1cc6 ],
      candle: 0x60,
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e187a, 0x057e1cbc ],
      candle: 0x60,
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e18b6, 0x057e1ef0 ],
      candle: 0x30,
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e18c0, 0x057e1cb2 ],
      candle: 0x60,
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e18d4, 0x057e1ca8 ],
      candle: 0x60,
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e18e8, 0x057e1ee6 ],
      candle: 0x30,
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e18f2, 0x057e1c9e ],
      candle: 0x60,
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e18fc, 0x057e1c94 ],
      candle: 0x60,
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e1910, 0x057e1edc ],
      candle: 0x20,
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e191a, 0x057e1c8a ],
      candle: 0x60,
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e192e, 0x057e1ed2 ],
      candle: 0x30,
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e1938, 0x057e1c80 ],
      candle: 0x60,
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e194c, 0x057e1ec8 ],
      candle: 0x30,
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e1960, 0x057e1c76 ],
      candle: 0x60,
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e196a, 0x057e1c6c ],
      candle: 0x60,
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e1974, 0x057e1c62 ],
      candle: 0x60,
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e1992, 0x057e1c58 ],
      candle: 0x60,
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e19ce, 0x057e1c4e ],
      candle: 0x60,
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e19d8, 0x057e1c44 ],
      candle: 0x60,
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e19e2, 0x057e1c3a ],
      candle: 0x60,
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e1a00, 0x057e1c30 ],
      candle: 0x60,
    }],
  }, {
    name: 'Big heart',
    type: TYPE.HEART,
    id: 1,
    tiles: [{
      zone: ZONE.ST0,
      addresses: [ 0x05341c6a, 0x05341f2a ],
      candle: 0x30,
    }, {
      zone: ZONE.ST0,
      addresses: [ 0x05341df4, 0x05341f34 ],
      candle: 0x30,
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c5542, 0x043c5d18 ],
      candle: 0x10,
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c57a8, 0x043c5e4e ],
      candle: 0x10,
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c5aa0, 0x043c62bc ],
      candle: 0x10,
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c5abe, 0x043c6230 ],
      candle: 0x10,
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c599c, 0x043c615e ],
      candle: 0x10,
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c591a, 0x043c6096 ],
      candle: 0x10,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04492c5e, 0x0449365a ],
      candle: 0x10,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04492c86, 0x0449366e ],
      candle: 0x00,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04492ce0, 0x044936dc ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x0449336a, 0x04493d5c ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04492dbc, 0x044937ae ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04493414, 0x04493e24 ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x044934fa, 0x04493f1e ],
      candle: 0x00,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x044930d6, 0x04493abe ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04492bd2, 0x04493600 ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04493176, 0x04493bcc ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x0449318a, 0x04493b4a ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04493496, 0x04493eb0 ],
      candle: 0x20,
    }, {
      zone: ZONE.CHI,
      addresses: [ 0x045ea9a4, 0x045ead32 ],
      candle: 0x00,
    }, {
      zone: ZONE.CHI,
      addresses: [ 0x045eaa12, 0x045ead78 ],
      candle: 0x10,
    }, {
      zone: ZONE.CHI,
      addresses: [ 0x045eaa26, 0x045ead82 ],
      candle: 0x10,
    }, {
      zone: ZONE.CHI,
      addresses: [ 0x045eaa4e, 0x045eadf0 ],
      candle: 0x00,
    }, {
      zone: ZONE.DAI,
      addresses: [ 0x0467912a, 0x04679bba ],
      candle: 0x10,
    }, {
      zone: ZONE.DAI,
      addresses: [ 0x04679184, 0x04679c64 ],
      candle: 0x10,
    }, {
      zone: ZONE.DAI,
      addresses: [ 0x04678ec8, 0x04679980 ],
      candle: 0x10,
    }, {
      zone: ZONE.DAI,
      addresses: [ 0x04678d7e, 0x04679840 ],
      candle: 0x10,
    }, {
      zone: ZONE.DAI,
      addresses: [ 0x04678d88, 0x0467984a ],
      candle: 0x10,
    }, {
      zone: ZONE.DAI,
      addresses: [ 0x04678d92, 0x04679854 ],
      candle: 0x10,
    }, {
      zone: ZONE.DAI,
      addresses: [ 0x04678b72, 0x0467975a ],
      candle: 0x10,
    }, {
      zone: ZONE.DAI,
      addresses: [ 0x04678b7c, 0x04679764 ],
      candle: 0x10,
    }, {
      zone: ZONE.DAI,
      addresses: [ 0x04678dc4, 0x0467993a ],
      candle: 0x00,
    }, {
      zone: ZONE.DAI,
      addresses: [ 0x04679328, 0x04679f92 ],
      candle: 0x10,
    }, {
      zone: ZONE.DAI,
      addresses: [ 0x0467933c, 0x04679e08 ],
      candle: 0x10,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a595a, 0x047a6110 ],
      candle: 0x00,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a5982, 0x047a6188 ],
      candle: 0x00,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a5630, 0x047a5ea4 ],
      candle: 0x00,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a5662, 0x047a5e2c ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fcebc, 0x048fe0a0 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fcf66, 0x048fdf4c ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fcf98, 0x048fe050 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fcfde, 0x048fe01e ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd01a, 0x048fe104 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd168, 0x048fe140 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd24e, 0x048fe1cc ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd2a8, 0x048fe186 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd2ee, 0x048fe1f4 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd424, 0x048fe504 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd46a, 0x048fe536 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd780, 0x048fe838 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd366, 0x048fe3f6 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd384, 0x048fe43c ],
      candle: 0x20,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd4e2, 0x048fe590 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd690, 0x048fe7a2 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd5a0, 0x048fe69e ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd618, 0x048fe6da ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fcdf4, 0x048fdee8 ],
      candle: 0x80,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fce12, 0x048fdef2 ],
      candle: 0x80,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd528, 0x048fe5ea ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd866, 0x048fe932 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO1,
      addresses: [ 0x049d5a5a, 0x049d6352 ],
      candle: 0x50,
    }, {
      zone: ZONE.NO1,
      addresses: [ 0x049d596a, 0x049d60ce ],
      candle: 0x50,
    }, {
      zone: ZONE.NO1,
      addresses: [ 0x049d5556, 0x049d5e62 ],
      candle: 0x50,
    }, {
      zone: ZONE.NO1,
      addresses: [ 0x049d5592, 0x049d5e80 ],
      candle: 0x50,
    }, {
      zone: ZONE.NO1,
      addresses: [ 0x049d5c58, 0x049d650a ],
      candle: 0x50,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa472c, 0x04aa4f70 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa4678, 0x04aa4e9e ],
      candle: 0x00,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa41c4, 0x04aa4a1c ],
      candle: 0x30,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa40c0, 0x04aa48be ],
      candle: 0x40,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa434a, 0x04aa4b5c ],
      candle: 0x00,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa44ac, 0x04aa4dcc ],
      candle: 0x10,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa451a, 0x04aa4b84 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa45a6, 0x04aa4df4 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa4282, 0x04aa4b02 ],
      candle: 0x60,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6acf8, 0x04b6b5b4 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6ac4e, 0x04b6b50a ],
      candle: 0x00,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6ad34, 0x04b6b5f0 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6b256, 0x04b6bb1c ],
      candle: 0x00,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6b09e, 0x04b6b950 ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f8ece, 0x053f9744 ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f8ed8, 0x053f974e ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f9288, 0x053f9ab8 ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f8bb8, 0x053f9424 ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f8b0e, 0x053f937a ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f8bfe, 0x053f9460 ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f9148, 0x053f99d2 ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f8e56, 0x053f96a4 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c341ea, 0x04c354c8 ],
      candle: 0x50,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c344d8, 0x04c357ca ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c343de, 0x04c356bc ],
      candle: 0x50,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c343e8, 0x04c35716 ],
      candle: 0x50,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c34348, 0x04c35630 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c342d0, 0x04c355d6 ],
      candle: 0x60,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c34302, 0x04c355f4 ],
      candle: 0x60,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c34e64, 0x04c3614c ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c345b4, 0x04c3589c ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c34b3a, 0x04c35dc8 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c34bf8, 0x04c35d8c ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c3429e, 0x04c35590 ],
      candle: 0x60,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b41e4, 0x054b4dba ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b43b4, 0x054b4e1e ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3ba4, 0x054b460e ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3cbc, 0x054b4712 ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3ffa, 0x054b4a00 ],
      candle: 0x00,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3dca, 0x054b47bc ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3e7e, 0x054b48c0 ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x0557569c, 0x05576214 ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x05575714, 0x0557628c ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x05575750, 0x05576264 ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x055757a0, 0x055761b0 ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x055752dc, 0x05575dfa ],
      candle: 0x40,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x05575426, 0x055760e8 ],
      candle: 0x50,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x0557549e, 0x05576124 ],
      candle: 0x60,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x0557550c, 0x05575f80 ],
      candle: 0x00,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x0557555c, 0x05575fe4 ],
      candle: 0x50,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x05575102, 0x05575d32 ],
      candle: 0x40,
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x05610dea, 0x0561166a ],
      candle: 0x60,
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x05610f2a, 0x056116c4 ],
      candle: 0x60,
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x05610f98, 0x05611606 ],
      candle: 0x60,
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x05610fa2, 0x05611314 ],
      candle: 0x60,
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x05611218, 0x05611908 ],
      candle: 0x30,
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x05611074, 0x0561175a ],
      candle: 0x30,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x0575335a, 0x057539ee ],
      candle: 0x10,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x05752eb4, 0x05753418 ],
      candle: 0x10,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x05753148, 0x05753872 ],
      candle: 0x10,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x05753166, 0x0575368e ],
      candle: 0x10,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x0575309e, 0x05753652 ],
      candle: 0x10,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x05752fa4, 0x05753544 ],
      candle: 0x10,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfcd0a, 0x04cfda98 ],
      candle: 0x00,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfcd14, 0x04cfdaa2 ],
      candle: 0x10,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfcd3c, 0x04cfdac0 ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfd434, 0x04cfe1d6 ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfd1f0, 0x04cfde80 ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfd556, 0x04cfe23a ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfd358, 0x04cfdfa2 ],
      candle: 0x00,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfd15a, 0x04cfdde0 ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfcc4c, 0x04cfd99e ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfcf8e, 0x04cfdc1e ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfcfa2, 0x04cfdbb0 ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfd80c, 0x04cfe460 ],
      candle: 0x20,
    }, {
      zone: ZONE.RCHI,
      addresses: [ 0x04da66b0, 0x04da6b06 ],
      candle: 0x00,
    }, {
      zone: ZONE.RCHI,
      addresses: [ 0x04da66f6, 0x04da6b60 ],
      candle: 0x10,
    }, {
      zone: ZONE.RCHI,
      addresses: [ 0x04da6714, 0x04da6b6a ],
      candle: 0x10,
    }, {
      zone: ZONE.RCHI,
      addresses: [ 0x04da67c8, 0x04da6c46 ],
      candle: 0x00,
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e33a72, 0x04e34504 ],
      candle: 0x10,
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e33b12, 0x04e3457c ],
      candle: 0x10,
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e33ef0, 0x04e34978 ],
      candle: 0x10,
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e3360e, 0x04e340aa ],
      candle: 0x10,
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e33618, 0x04e3408c ],
      candle: 0x10,
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e33622, 0x04e34082 ],
      candle: 0x10,
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e3351e, 0x04e33fb0 ],
      candle: 0x10,
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e33528, 0x04e33fa6 ],
      candle: 0x10,
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e337bc, 0x04e340e6 ],
      candle: 0x00,
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e33c5c, 0x04e3463a ],
      candle: 0x10,
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e33c70, 0x04e346e4 ],
      candle: 0x10,
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee41d2, 0x04ee485c ],
      candle: 0x00,
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee41fa, 0x04ee48de ],
      candle: 0x00,
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee436c, 0x04ee4a5a ],
      candle: 0x00,
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee4380, 0x04ee49d8 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88876, 0x04f89d6a ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f888d0, 0x04f89b36 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f8892a, 0x04f89dce ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88bc2, 0x04f89b86 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f887f4, 0x04f89abe ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88812, 0x04f89a82 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88c58, 0x04f89f68 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88c94, 0x04f89fea ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88ce4, 0x04f89f90 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88dac, 0x04f8a08a ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88e10, 0x04f8a058 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f897e2, 0x04f8aad4 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f89562, 0x04f8a836 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f8956c, 0x04f8a890 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f89486, 0x04f8a76e ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f8968e, 0x04f8a926 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f89738, 0x04f8a962 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88736, 0x04f89a0a ],
      candle: 0x80,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88754, 0x04f89a14 ],
      candle: 0x80,
    }, {
      zone: ZONE.RNO1,
      addresses: [ 0x05051b4a, 0x05052370 ],
      candle: 0x50,
    }, {
      zone: ZONE.RNO1,
      addresses: [ 0x05051ad2, 0x050521f0 ],
      candle: 0x50,
    }, {
      zone: ZONE.RNO1,
      addresses: [ 0x05051cee, 0x05052514 ],
      candle: 0x50,
    }, {
      zone: ZONE.RNO1,
      addresses: [ 0x05051d20, 0x05052532 ],
      candle: 0x50,
    }, {
      zone: ZONE.RNO1,
      addresses: [ 0x05051f00, 0x0505273a ],
      candle: 0x50,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa29e, 0x050fabc6 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa32a, 0x050fac52 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa398, 0x050faca2 ],
      candle: 0x30,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa410, 0x050fad1a ],
      candle: 0x40,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa4d8, 0x050fae46 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa53c, 0x050fae3c ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa56e, 0x050fae96 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa582, 0x050fae8c ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa5aa, 0x050fae32 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa5f0, 0x050fb142 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa766, 0x050fae82 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa784, 0x050fae78 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa7b6, 0x050fae1e ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa81a, 0x050fae14 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa82e, 0x050fb14c ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050faaa4, 0x050fb35e ],
      candle: 0x60,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051afd3e, 0x051b0526 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051afe78, 0x051b051c ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051affae, 0x051b07be ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051afa6e, 0x051b0274 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051af9f6, 0x051b01e8 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051b00b2, 0x051b0890 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051afc80, 0x051b045e ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051afb90, 0x051b03be ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526ebfc, 0x0526fdb6 ],
      candle: 0x50,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526dfbe, 0x0526f02a ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526de3e, 0x0526efee ],
      candle: 0x50,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526de48, 0x0526ef94 ],
      candle: 0x50,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526dd08, 0x0526eec2 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526dc7c, 0x0526ee36 ],
      candle: 0x60,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526dcd6, 0x0526ee5e ],
      candle: 0x60,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526e676, 0x0526f83a ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526ecc4, 0x0526fe7e ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526e1e4, 0x0526f452 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526e28e, 0x0526f40c ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526dc18, 0x0526edb4 ],
      candle: 0x60,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904e9a, 0x059059bc ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904ecc, 0x05905a16 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x0590492c, 0x05905346 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904a4e, 0x0590547c ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904c4c, 0x05905698 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904b02, 0x05905558 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904b84, 0x059055e4 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be246, 0x059bed0a ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be2aa, 0x059bec38 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be318, 0x059bec60 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be390, 0x059becc4 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be02a, 0x059be9d6 ],
      candle: 0x40,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be174, 0x059beb20 ],
      candle: 0x50,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be192, 0x059beb84 ],
      candle: 0x60,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be200, 0x059beae4 ],
      candle: 0x50,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059bdf76, 0x059be94a ],
      candle: 0x40,
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e1aa0, 0x057e2012 ],
      candle: 0x30,
    }],
  }, {
    name: '$1',
    type: TYPE.GOLD,
    id: 2,
    tiles: [{
      zone: ZONE.CAT,
      addresses: [ 0x04492d3a, 0x0449374a ],
      candle: 0x10,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04493450, 0x04493de8 ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04493112, 0x04493b0e ],
      candle: 0x20,
    }, {
      zone: ZONE.CHI,
      addresses: [ 0x045eaa1c, 0x045ead96 ],
      candle: 0x00,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a5806, 0x047a5fd0 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fceb2, 0x048fdfa6 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fced0, 0x048fdfb0 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fcef8, 0x048fdfba ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fcf0c, 0x048fdfc4 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fcf5c, 0x048fdfd8 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fcf84, 0x048fdfe2 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fcfa2, 0x048fdfec ],
      candle: 0x00,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa46be, 0x04aa4eb2 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa448e, 0x04aa4dc2 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6ac44, 0x04b6b528 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6b062, 0x04b6b98c ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f8b04, 0x053f9398 ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f8e10, 0x053f96f4 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c342da, 0x04c355e0 ],
      candle: 0x60,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c342e4, 0x04c355ea ],
      candle: 0x60,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c342ee, 0x04c355cc ],
      candle: 0x60,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c342f8, 0x04c355c2 ],
      candle: 0x60,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c35026, 0x04c3642a ],
      candle: 0x00,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3f82, 0x054b4a3c ],
      candle: 0x00,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3e74, 0x054b48ac ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x05575840, 0x05576354 ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x055754a8, 0x05575f62 ],
      candle: 0x00,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfceee, 0x04cfdb42 ],
      candle: 0x10,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfd498, 0x04cfe262 ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfcff2, 0x04cfdc46 ],
      candle: 0x20,
    }, {
      zone: ZONE.RCHI,
      addresses: [ 0x04da6700, 0x04da6b4c ],
      candle: 0x00,
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee44de, 0x04ee4bea ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f888bc, 0x04f89dba ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88902, 0x04f89db0 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88a78, 0x04f89da6 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88afa, 0x04f89d92 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88b2c, 0x04f89d88 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88b86, 0x04f89d7e ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88bd6, 0x04f89d74 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa2f8, 0x050fac66 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051af9ec, 0x051b01d4 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051afbe0, 0x051b036e ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526dc90, 0x0526ee72 ],
      candle: 0x60,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526dcae, 0x0526ee7c ],
      candle: 0x60,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526dcc2, 0x0526ee54 ],
      candle: 0x60,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526dce0, 0x0526ee4a ],
      candle: 0x60,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526e8fa, 0x0526f98e ],
      candle: 0x00,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904cc4, 0x05905666 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904b7a, 0x059055ee ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be3fe, 0x059beda0 ],
      candle: 0x10,
    }],
  }, {
    name: '$25',
    type: TYPE.GOLD,
    id: 3,
    tiles: [{
      zone: ZONE.ARE,
      addresses: [ 0x043c5588, 0x043c5d36 ],
      candle: 0x10,
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c5a96, 0x043c6226 ],
      candle: 0x10,
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c5b54, 0x043c6334 ],
      candle: 0x10,
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c5b72, 0x043c633e ],
      candle: 0x10,
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c59ec, 0x043c614a ],
      candle: 0x10,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04492c22, 0x0449363c ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04492bfa, 0x044935f6 ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04493126, 0x04493b5e ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04493144, 0x04493ba4 ],
      candle: 0x20,
    }, {
      zone: ZONE.CHI,
      addresses: [ 0x045ea9c2, 0x045ead50 ],
      candle: 0x10,
    }, {
      zone: ZONE.CHI,
      addresses: [ 0x045eab84, 0x045eb01a ],
      candle: 0x00,
    }, {
      zone: ZONE.DAI,
      addresses: [ 0x04679008, 0x04679aac ],
      candle: 0x10,
    }, {
      zone: ZONE.DAI,
      addresses: [ 0x046791d4, 0x04679c78 ],
      candle: 0x10,
    }, {
      zone: ZONE.DAI,
      addresses: [ 0x04678e14, 0x046798fe ],
      candle: 0x00,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a575c, 0x047a5f44 ],
      candle: 0x00,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a5626, 0x047a5df0 ],
      candle: 0x00,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a58a6, 0x047a60a2 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fcec6, 0x048fdf74 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fcf52, 0x048fe06e ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd474, 0x048fe540 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd6ae, 0x048fe7b6 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd582, 0x048fe68a ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd870, 0x048fe93c ],
      candle: 0x10,
    }, {
      zone: ZONE.NO1,
      addresses: [ 0x049d55e2, 0x049d5ee4 ],
      candle: 0x60,
    }, {
      zone: ZONE.NO1,
      addresses: [ 0x049d5b54, 0x049d662c ],
      candle: 0x50,
    }, {
      zone: ZONE.NO1,
      addresses: [ 0x049d5d52, 0x049d6564 ],
      candle: 0x50,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa4510, 0x04aa4bac ],
      candle: 0x00,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa411a, 0x04aa4972 ],
      candle: 0x60,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa4232, 0x04aa4ac6 ],
      candle: 0x60,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa42c8, 0x04aa4ae4 ],
      candle: 0x60,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6ad20, 0x04b6b604 ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f8be0, 0x053f9474 ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f8c8a, 0x053f94ec ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c344e2, 0x04c357c0 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c34eaa, 0x04c36156 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c3520a, 0x04c364a2 ],
      candle: 0x00,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b4252, 0x054b4dec ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b4086, 0x054b4b36 ],
      candle: 0x00,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3c08, 0x054b465e ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3f8c, 0x054b49f6 ],
      candle: 0x00,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3f96, 0x054b4a46 ],
      candle: 0x00,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3d66, 0x054b47da ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3dac, 0x054b4816 ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3dc0, 0x054b47c6 ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3e92, 0x054b48e8 ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3d16, 0x054b476c ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x05575804, 0x05576368 ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x055756c4, 0x055762aa ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x0557578c, 0x05576250 ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x0557546c, 0x05576002 ],
      candle: 0x50,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x05575534, 0x05575fee ],
      candle: 0x50,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x0575315c, 0x05753868 ],
      candle: 0x10,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x057531e8, 0x057538b8 ],
      candle: 0x10,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x05753210, 0x057538ae ],
      candle: 0x10,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x05753080, 0x0575363e ],
      candle: 0x10,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfcd1e, 0x04cfda8e ],
      candle: 0x10,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfccec, 0x04cfda70 ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfcbb6, 0x04cfd9b2 ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfcfc0, 0x04cfdbce ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfcfde, 0x04cfdc32 ],
      candle: 0x20,
    }, {
      zone: ZONE.RCHI,
      addresses: [ 0x04da66a6, 0x04da6ac0 ],
      candle: 0x10,
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e33aea, 0x04e34590 ],
      candle: 0x10,
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee43a8, 0x04ee4a96 ],
      candle: 0x00,
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee4448, 0x04ee4b18 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88d84, 0x04f8a094 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f893be, 0x04f8a4d6 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f89666, 0x04f8a912 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f896e8, 0x04f8a9a8 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO1,
      addresses: [ 0x05051c94, 0x0505249c ],
      candle: 0x60,
    }, {
      zone: ZONE.RNO1,
      addresses: [ 0x05051e1a, 0x0505271c ],
      candle: 0x50,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa5e6, 0x050fb11a ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa996, 0x050fb2b4 ],
      candle: 0x60,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050faa4a, 0x050fb340 ],
      candle: 0x60,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051b00e4, 0x051b08a4 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526df96, 0x0526f034 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526e630, 0x0526f812 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526e9fe, 0x0526fbd6 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904e7c, 0x059059d0 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904f08, 0x05905a2a ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904b2a, 0x05905530 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904a94, 0x059054c2 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be250, 0x059bec24 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be372, 0x059bec7e ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be188, 0x059beb2a ],
      candle: 0x50,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be1ec, 0x059beb3e ],
      candle: 0x50,
    }],
  }, {
    name: '$50',
    type: TYPE.GOLD,
    id: 4,
    tiles: [{
      zone: ZONE.ARE,
      addresses: [ 0x043c5560, 0x043c5d22 ],
      candle: 0x10,
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c5c62, 0x043c641a ],
      candle: 0x10,
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c57da, 0x043c5e30 ],
      candle: 0x10,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04493360, 0x04493d52 ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x044930ae, 0x04493ad2 ],
      candle: 0x20,
    }, {
      zone: ZONE.CHI,
      addresses: [ 0x045ea9d6, 0x045ead28 ],
      candle: 0x00,
    }, {
      zone: ZONE.DAI,
      addresses: [ 0x0467944a, 0x0467a064 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd334, 0x048fe432 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO1,
      addresses: [ 0x049d5a78, 0x049d635c ],
      candle: 0x50,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa4650, 0x04aa4e94 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa4070, 0x04aa48dc ],
      candle: 0x40,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa456a, 0x04aa4c4c ],
      candle: 0x10,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa4592, 0x04aa4b8e ],
      candle: 0x00,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6ac26, 0x04b6b4e2 ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f8ae6, 0x053f9352 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c341e0, 0x04c354a0 ],
      candle: 0x50,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c34b4e, 0x04c35db4 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c342a8, 0x04c3559a ],
      candle: 0x60,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b4202, 0x054b4da6 ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3b68, 0x054b45be ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3cda, 0x054b4726 ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3e24, 0x054b4884 ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b447c, 0x054b4ef0 ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x055756e2, 0x055761a6 ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x0557571e, 0x05576282 ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x05575444, 0x055760de ],
      candle: 0x50,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x05753328, 0x05753a0c ],
      candle: 0x10,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x05752f40, 0x057534e0 ],
      candle: 0x10,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x05752d5c, 0x057533fa ],
      candle: 0x10,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfd43e, 0x04cfe1cc ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfd182, 0x04cfddcc ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfcbac, 0x04cfda48 ],
      candle: 0x20,
    }, {
      zone: ZONE.RCHI,
      addresses: [ 0x04da666a, 0x04da6b1a ],
      candle: 0x00,
    }, {
      zone: ZONE.RCHI,
      addresses: [ 0x04da676e, 0x04da6be2 ],
      candle: 0x00,
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e339be, 0x04e34446 ],
      candle: 0x10,
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e3376c, 0x04e34266 ],
      candle: 0x00,
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee4060, 0x04ee4726 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88a8c, 0x04f89b54 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO1,
      addresses: [ 0x05051fbe, 0x05052636 ],
      candle: 0x50,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa2b2, 0x050faba8 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa442, 0x050fad38 ],
      candle: 0x40,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa77a, 0x050fb124 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fab1c, 0x050fb368 ],
      candle: 0x60,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051af992, 0x051b018e ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526ec06, 0x0526fdca ],
      candle: 0x50,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526e284, 0x0526f420 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526dc04, 0x0526edbe ],
      candle: 0x60,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904d5a, 0x0590572e ],
      candle: 0x00,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x059048dc, 0x059052e2 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x0590497c, 0x05905378 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904a76, 0x0590545e ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904cb0, 0x059056c0 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904ae4, 0x059054fe ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904af8, 0x0590554e ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904bfc, 0x05905616 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x059050b0, 0x05905ac0 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be30e, 0x059bec56 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be340, 0x059bed14 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be1f6, 0x059beada ],
      candle: 0x50,
    }],
  }, {
    name: '$100',
    type: TYPE.GOLD,
    id: 5,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.ARE,
      addresses: [ 0x043c5ab4, 0x043c62c6 ],
      candle: 0x10,
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c59ce, 0x043c61cc ],
      candle: 0x10,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04492c68, 0x04493682 ],
      candle: 0x10,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04493432, 0x04493e10 ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04492c04, 0x044935ce ],
      candle: 0x20,
    }, {
      zone: ZONE.CHI,
      addresses: [ 0x045eaa94, 0x045eadfa ],
      candle: 0x00,
    }, {
      zone: ZONE.DAI,
      addresses: [ 0x04679332, 0x04679f60 ],
      candle: 0x10,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a593c, 0x047a611a ],
      candle: 0x00,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a56c6, 0x047a5d96 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd17c, 0x048fe10e ],
      candle: 0x10,
    }, {
      zone: ZONE.NO1,
      addresses: [ 0x049d597e, 0x049d62b2 ],
      candle: 0x50,
    }, {
      zone: ZONE.NO1,
      addresses: [ 0x049d5b86, 0x049d6514 ],
      candle: 0x50,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa41ba, 0x04aa4a12 ],
      candle: 0x30,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa44e8, 0x04aa4bb6 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa44fc, 0x04aa4dd6 ],
      candle: 0x10,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f924c, 0x053f9aa4 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c34190, 0x04c354dc ],
      candle: 0x50,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c34b76, 0x04c35d96 ],
      candle: 0x00,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b4266, 0x054b4df6 ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3e10, 0x054b48f2 ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x05575728, 0x055761d8 ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x05575782, 0x0557619c ],
      candle: 0x10,
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x05610e9e, 0x056116a6 ],
      candle: 0x60,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x05753350, 0x057539f8 ],
      candle: 0x10,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x05753152, 0x05753698 ],
      candle: 0x10,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x0575308a, 0x057535c6 ],
      candle: 0x10,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfd4ca, 0x04cfe226 ],
      candle: 0x20,
    }, {
      zone: ZONE.RCHI,
      addresses: [ 0x04da68b8, 0x04da6cb4 ],
      candle: 0x00,
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e33da6, 0x04e34806 ],
      candle: 0x10,
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee4222, 0x04ee48e8 ],
      candle: 0x00,
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee4312, 0x04ee4abe ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88b90, 0x04f89df6 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO1,
      addresses: [ 0x05051b40, 0x0505237a ],
      candle: 0x50,
    }, {
      zone: ZONE.RNO1,
      addresses: [ 0x05051a6e, 0x0505213c ],
      candle: 0x50,
    }, {
      zone: ZONE.RNO1,
      addresses: [ 0x05051faa, 0x05052744 ],
      candle: 0x50,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa3ac, 0x050fac98 ],
      candle: 0x30,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa532, 0x050fb138 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051b0012, 0x051b07aa ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051aff22, 0x051b05a8 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526ec2e, 0x0526fdac ],
      candle: 0x50,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526e252, 0x0526f42a ],
      candle: 0x00,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904c92, 0x05905670 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904b98, 0x059055bc ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be43a, 0x059bedb4 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be264, 0x059bed32 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be2fa, 0x059becf6 ],
      candle: 0x10,
    }, {
      addresses: [ 0x000b6c04 ],
      enemy: 5,
    }],
  }, {
    name: '$250',
    type: TYPE.GOLD,
    id: 6,
    tiles: [{
      zone: ZONE.CAT,
      addresses: [ 0x044930fe, 0x04493b2c ],
      candle: 0x10,
    }, {
      zone: ZONE.DAI,
      addresses: [ 0x04679346, 0x04679dae ],
      candle: 0x10,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a5b5c, 0x047a621e ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fcf3e, 0x048fdfce ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd5e6, 0x048fe64e ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c3449c, 0x04c35702 ],
      candle: 0x50,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c3496e, 0x04c35b52 ],
      candle: 0x00,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x055752d2, 0x05575dd2 ],
      candle: 0x40,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfcffc, 0x04cfdc3c ],
      candle: 0x10,
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e33c66, 0x04e34694 ],
      candle: 0x10,
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee4150, 0x04ee47f8 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88ab4, 0x04f89d9c ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88790, 0x04f89a5a ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f8879a, 0x04f89a50 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa33e, 0x050fac48 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526dd9e, 0x0526efa8 ],
      candle: 0x50,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526e522, 0x0526f790 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904eea, 0x05905a34 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be034, 0x059be9e0 ],
      candle: 0x40,
    }],
  }, {
    name: '$400',
    type: TYPE.GOLD,
    id: 7,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.NP3,
      addresses: [ 0x053f8ec4, 0x053f973a ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c3419a, 0x04c354e6 ],
      candle: 0x50,
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x05610f8e, 0x0561131e ],
      candle: 0x60,
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x0561101a, 0x05611440 ],
      candle: 0x60,
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e33c7a, 0x04e34734 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051afd34, 0x051b0530 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526ec38, 0x0526fda2 ],
      candle: 0x50,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904be8, 0x0590559e ],
      candle: 0x20,
    }, {
      addresses: [ 0x000b7464 ],
      enemy: 19,
    }, {
      addresses: [ 0x000b6e34 ],
      enemy: 25,
    }, {
      addresses: [ 0x000b6bb4 ],
      enemy: 32,
    }],
  }, {
    name: '$1000',
    type: TYPE.GOLD,
    id: 9,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.ARE,
      addresses: [ 0x043c58ca, 0x043c60b4 ],
      candle: 0x10,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x05752fe0, 0x05753562 ],
      candle: 0x10,
    }, {
      addresses: [ 0x000b83cc ],
      enemy: 40,
    }],
  }, {
    name: '$2000',
    type: TYPE.GOLD,
    id: 10,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.NO4,
      addresses: [ 0x04c3491e, 0x04c35b84 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526e572, 0x0526f74a ],
      candle: 0x00,
    }, {
      addresses: [ 0x000b859c ],
      enemy: 50,
    }],
  }, {
    name: 'Dagger',
    type: TYPE.SUBWEAPON,
    id: 14,
    tiles: [{
      zone: ZONE.RNZ0,
      addresses: [ 0x04f883c4 ],
      byte: true,
      tank: true,
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c5898, 0x043c5ed0 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fcfe8, 0x048fe028 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd3de, 0x048fe4be ],
      candle: 0x10,
    }, {
      zone: ZONE.NO1,
      addresses: [ 0x049d57cc, 0x049d6258 ],
      candle: 0x50,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa4052, 0x04aa48f0 ],
      candle: 0x40,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6acee, 0x04b6b5aa ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f8bae, 0x053f941a ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c34334, 0x04c3563a ],
      candle: 0x00,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3c76, 0x054b46cc ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x05575746, 0x0557626e ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x05575094, 0x05575cd8 ],
      candle: 0x40,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x05752ef0, 0x0575349a ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88880, 0x04f89cf2 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO1,
      addresses: [ 0x05051b04, 0x05052182 ],
      candle: 0x50,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa46a, 0x050fad4c ],
      candle: 0x40,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051afa82, 0x051b026a ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526dd26, 0x0526eeae ],
      candle: 0x00,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x059049f4, 0x059053d2 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be2b4, 0x059bec42 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059bdfe4, 0x059be9a4 ],
      candle: 0x40,
    }],
  }, {
    name: 'Axe',
    type: TYPE.SUBWEAPON,
    id: 15,
    tiles: [{
      zone: ZONE.NZ0,
      addresses: [ 0x054b372c ],
      byte: true,
      tank: true,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x04f883d0 ],
      byte: true,
      tank: true,
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c5820, 0x043c5eb2 ],
      candle: 0x10,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x044934f0, 0x04493f14 ],
      candle: 0x10,
    }, {
      zone: ZONE.CHI,
      addresses: [ 0x045eaa8a, 0x045eaddc ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd64a, 0x048fe702 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa452e, 0x04aa4de0 ],
      candle: 0x10,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f8c9e, 0x053f951e ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c34438, 0x04c3572a ],
      candle: 0x00,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3b54, 0x054b45a0 ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x0557537c, 0x0557617e ],
      candle: 0x50,
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x05610fac, 0x056112f6 ],
      candle: 0x60,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x05752f22, 0x0575347c ],
      candle: 0x10,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfd362, 0x04cfdfb6 ],
      candle: 0x10,
    }, {
      zone: ZONE.RCHI,
      addresses: [ 0x04da67b4, 0x04da6e34 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f897a6, 0x04f8a98a ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa752, 0x050fae28 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051aff0e, 0x051b058a ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526ddf8, 0x0526ef8a ],
      candle: 0x00,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x059048c8, 0x05905300 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be12e, 0x059beb98 ],
      candle: 0x50,
    }, {
      addresses: [ 0x000b83a4 ],
      enemy: 12,
    }, {
      addresses: [ 0x000b5964 ],
      enemy: 30,
    }],
  }, {
    name: 'Cross',
    type: TYPE.SUBWEAPON,
    id: 16,
    tiles: [{
      zone: ZONE.NZ0,
      addresses: [ 0x054b371c ],
      byte: true,
      tank: true,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x04f883c0 ],
      byte: true,
      tank: true,
    }, {
      zone: ZONE.ST0,
      addresses: [ 0x05341bf2, 0x05341e62 ],
      candle: 0x30,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f8f3c, 0x053f9730 ],
      candle: 0x00,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x05575642, 0x05575f9e ],
      candle: 0x00,
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x05610f48, 0x056113be ],
      candle: 0x30,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051afcd0, 0x051b053a ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526dd58, 0x0526eefe ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526dc40, 0x0526eda0 ],
      candle: 0x60,
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e1848, 0x057e1f2c ],
      candle: 0x30,
    }],
  }, {
    name: 'Holy Water',
    type: TYPE.SUBWEAPON,
    id: 17,
    tiles: [{
      zone: ZONE.RNZ0,
      addresses: [ 0x04f883d4 ],
      byte: true,
      tank: true,
    }, {
      zone: ZONE.ST0,
      addresses: [ 0x05341b66, 0x05341e94 ],
      candle: 0x20,
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c5870, 0x043c5ec6 ],
      candle: 0x10,
    }, {
      zone: ZONE.CHI,
      addresses: [ 0x045ea9b8, 0x045ead46 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fce6c, 0x048fe0be ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd744, 0x048fe824 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa426e, 0x04aa4a8a ],
      candle: 0x40,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6ad16, 0x04b6b5d2 ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f8bd6, 0x053f9442 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c34384, 0x04c35662 ],
      candle: 0x00,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b41ee, 0x054b4db0 ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x05574ea0, 0x05575932 ],
      candle: 0x60,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x05574f54, 0x05575c42 ],
      candle: 0x60,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x05575030, 0x05575c1a ],
      candle: 0x60,
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x05610e12, 0x056113d2 ],
      candle: 0x20,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x05752f04, 0x05753490 ],
      candle: 0x10,
    }, {
      zone: ZONE.RCHI,
      addresses: [ 0x04da66c4, 0x04da6ade ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f88c08, 0x04f89ba4 ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f89814, 0x04f8aac0 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050faac2, 0x050fb390 ],
      candle: 0x40,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051b0116, 0x051b08ae ],
      candle: 0x00,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904e90, 0x059059b2 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059bdc70, 0x059be676 ],
      candle: 0x60,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059bdd2e, 0x059be88c ],
      candle: 0x60,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059bdf30, 0x059be850 ],
      candle: 0x60,
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e1956, 0x057e1ebe ],
      candle: 0x20,
    }],
  }, {
    name: 'Stopwatch',
    type: TYPE.SUBWEAPON,
    id: 18,
    tiles: [{
      zone: ZONE.RNZ0,
      addresses: [ 0x04f883d8 ],
      byte: true,
      tank: true,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04492be6, 0x0449360a ],
      candle: 0x20,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a5946, 0x047a6232 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd49c, 0x048fe57c ],
      candle: 0x10,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa4682, 0x04aa4f20 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b6b2b0, 0x04b6bb12 ],
      candle: 0x00,
    }, {
      zone: ZONE.NP3,
      addresses: [ 0x053f91a2, 0x053f99c8 ],
      candle: 0x00,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c3428a, 0x04c3557c ],
      candle: 0x60,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfcc06, 0x04cfd9a8 ],
      candle: 0x20,
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee420e, 0x04ee47da ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f894fe, 0x04f8a75a ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa320, 0x050fac0c ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051afc62, 0x051b0472 ],
      candle: 0x00,
    }],
  }, {
    name: 'Bible',
    type: TYPE.SUBWEAPON,
    id: 19,
    tiles: [{
      zone: ZONE.NZ0,
      addresses: [ 0x054b3724 ],
      byte: true,
      tank: true,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x04f883c8 ],
      byte: true,
      tank: true,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04492b96, 0x044935a6 ],
      candle: 0x20,
    }, {
      zone: ZONE.DAI,
      addresses: [ 0x0467901c, 0x04679ab6 ],
      candle: 0x10,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd4b0, 0x048fe59a ],
      candle: 0x20,
    }, {
      zone: ZONE.NO1,
      addresses: [ 0x049d5afa, 0x049d63f2 ],
      candle: 0x50,
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa4498, 0x04aa4bc0 ],
      candle: 0x00,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfcb7a, 0x04cfd908 ],
      candle: 0x20,
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e339aa, 0x04e34450 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f894c2, 0x04f8a746 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNO1,
      addresses: [ 0x0505189e, 0x050520a6 ],
      candle: 0x50,
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050fa806, 0x050fb12e ],
      candle: 0x00,
    }],
  }, {
    name: 'Rebound Stone',
    type: TYPE.SUBWEAPON,
    id: 20,
    tiles: [{
      zone: ZONE.NZ0,
      addresses: [ 0x054b3718 ],
      byte: true,
      tank: true,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x04f883bc ],
      byte: true,
      tank: true,
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c5848, 0x043c5ebc ],
      candle: 0x10,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04493392, 0x04493d66 ],
      candle: 0x20,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04492b8c, 0x0449359c ],
      candle: 0x20,
    }, {
      zone: ZONE.CHI,
      addresses: [ 0x045eaa58, 0x045eae0e ],
      candle: 0x00,
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fd320, 0x048fe46e ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b43c8, 0x054b4e00 ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x05575390, 0x05575efe ],
      candle: 0x50,
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x05610e3a, 0x05611688 ],
      candle: 0x60,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x05752f18, 0x05753486 ],
      candle: 0x10,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfd402, 0x04cfe1c2 ],
      candle: 0x20,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfcb84, 0x04cfd8fe ],
      candle: 0x20,
    }, {
      zone: ZONE.RCHI,
      addresses: [ 0x04da68ae, 0x04da6c0a ],
      candle: 0x00,
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f89602, 0x04f8a7f0 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904ec2, 0x05905a3e ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059be138, 0x059beaf8 ],
      candle: 0x50,
    }],
  }, {
    name: 'Vibhuti',
    type: TYPE.SUBWEAPON,
    id: 21,
    tiles: [{
      zone: ZONE.RNZ0,
      addresses: [ 0x04f883cc ],
      byte: true,
      tank: true,
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x044931d0, 0x04493b7c ],
      candle: 0x00,
    }, {
      zone: ZONE.DAI,
      addresses: [ 0x046794a4, 0x0467a0b4 ],
      candle: 0x10,
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b3e9c, 0x054b48fc ],
      candle: 0x20,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x05574e14, 0x055759be ],
      candle: 0x60,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x05574f5e, 0x05575c4c ],
      candle: 0x60,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x05575026, 0x05575bf2 ],
      candle: 0x60,
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfcf5c, 0x04cfdbec ],
      candle: 0x00,
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e33d74, 0x04e347d4 ],
      candle: 0x10,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05904ba2, 0x059055a8 ],
      candle: 0x20,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059bdcc0, 0x059be5e0 ],
      candle: 0x60,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059bdd24, 0x059be8aa ],
      candle: 0x60,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059bdf3a, 0x059be83c ],
      candle: 0x60,
    }],
  }, {
    name: 'Agunea',
    type: TYPE.SUBWEAPON,
    id: 22,
    tiles: [{
      zone: ZONE.NZ0,
      addresses: [ 0x054b3714 ],
      byte: true,
      tank: true,
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x04f883b8 ],
      byte: true,
      tank: true,
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c5c44, 0x043c63f2 ],
      candle: 0x10,
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x05752f7c, 0x057534ea ],
      candle: 0x10,
    }],
  }, {
    name: 'Heart Vessel',
    type: TYPE.POWERUP,
    id: 12,
    blacklist: [ 0x049d3674, 0x049d3676 ],
    tiles: [{
      zone: ZONE.NO2,
      addresses: [ 0x04aa1556 ],
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b68604, 0x053f5f80 ],
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b68612, 0x053f5f8e ],
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b229a ],
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x0560f616 ],
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x0560f618 ],
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x0560f61c ],
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x0557384a ],
    }, {
      zone: ZONE.NO1,
      addresses: [ 0x049d3678 ],
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fad9c ],
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fadaa ],
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c324a0, 0x061a73a4 ],
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c324da, 0x061a73de ],
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x044912f8 ],
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x044912f0 ],
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c3130 ],
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e016c ],
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e0170 ],
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e0174 ],
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059bc0e4 ],
    }, {
      zone: ZONE.RNO1,
      addresses: [ 0x0505016c ],
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f85aec ],
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526c0f6 ],
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526c106 ],
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfb6f4 ],
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfb6fe ],
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051ad79e ],
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05903072 ],
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e322be ],
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e322d6 ],
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x0575155e ],
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x05751562 ],
    }],
  }, {
    name: 'Life Vessel',
    type: TYPE.POWERUP,
    id: 23,
    blacklist: [ 0x049d3674, 0x049d3676 ],
    tiles: [{
      zone: ZONE.NO3,
      addresses: [ 0x04b68606, 0x053f5f82 ],
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b68610, 0x053f5f8c ],
    }, {
      zone: ZONE.NO3,
      addresses: [ 0x04b68614, 0x053f5f90 ],
    }, {
      zone: ZONE.NZ0,
      addresses: [ 0x054b229e ],
    }, {
      zone: ZONE.DAI,
      addresses: [ 0x04676f10 ],
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x0560f612 ],
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x0560f614 ],
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x05573848 ],
    }, {
      zone: ZONE.NO1,
      addresses: [ 0x049d367e ],
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fad98 ],
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fada8 ],
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c324a2, 0x061a73a6 ],
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c324aa, 0x061a73ae ],
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c324ac, 0x061a73b0 ],
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c324d0, 0x061a73d4 ],
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c324d8, 0x061a73dc ],
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x044912f6 ],
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e016a ],
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e016e ],
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e0172 ],
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059bc0e2 ],
    }, {
      zone: ZONE.RNO1,
      addresses: [ 0x05050172 ],
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f85aea ],
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526c0f4 ],
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526c100 ],
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfb6f2 ],
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfb700 ],
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051ad7a8 ],
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05903074 ],
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e322d8 ],
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e322cc ],
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050f87c8 ],
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x05751560 ],
    }],
  }, {
    name: 'Monster Vial 1',
    type: TYPE.USABLE,
    id: 1,
    tiles: [{
      addresses: [ 0x000b5caa ],
      enemy: 6,
    }, {
      addresses: [ 0x000b5cfa ],
      enemy: 10,
    }],
  }, {
    name: 'Monster Vial 2',
    type: TYPE.USABLE,
    id: 2,
    tiles: [{
      addresses: [ 0x000b63a2 ],
      enemy: 3,
    }],
  }, {
    name: 'Monster Vial 3',
    type: TYPE.USABLE,
    id: 3,
    tiles: [{
      zone: ZONE.CAT,
      addresses: [ 0x04491306 ],
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04491308 ],
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x0449130a ],
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x0449130c ],
    }, {
      addresses: [ 0x000b655a ],
      enemy: 7,
    }, {
      addresses: [ 0x000b60ac ],
      enemy: 76,
    }, {
      addresses: [ 0x000b6d94 ],
      enemy: 102,
    }, {
      addresses: [ 0x000b6e84 ],
      enemy: 113,
    }],
  }, {
    name: 'Shield Rod',
    type: TYPE.WEAPON1,
    id: 4,
    tiles: [{
      zone: ZONE.ARE,
      addresses: [ 0x043c3132 ],
    }, {
      zone: ZONE.ST0,
      addresses: [ 0x05341dd6, 0x05341f70 ],
      candle: 0x80,
    }],
  }, {
    name: 'Leather Shield',
    type: TYPE.SHIELD,
    id: 5,
    tiles: [{
      zone: ZONE.NZ0,
      addresses: [ 0x054b22a8 ],
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a3166 ],
      shop: true,
    }, {
      addresses: [ 0x000b77d4 ],
      enemy: 14,
    }, {
      addresses: [ 0x000b66ec ],
      enemy: 29,
    }],
  }, {
    name: 'Knight Shield',
    type: TYPE.SHIELD,
    id: 6,
    tiles: [{
      zone: ZONE.ARE,
      addresses: [ 0x043c3138 ],
    }, {
      addresses: [ 0x000b77d2 ],
      enemy: 14,
    }],
  }, {
    name: 'Iron Shield',
    type: TYPE.SHIELD,
    id: 7,
    tiles: [{
      zone: ZONE.LIB,
      addresses: [ 0x047a316e ],
      shop: true,
    }, {
      addresses: [ 0x000b6ed4 ],
      enemy: 41,
    }],
  }, {
    name: 'AxeLord Shield',
    type: TYPE.SHIELD,
    id: 8,
    tiles: [{
      addresses: [ 0x000b5962 ],
      enemy: 30,
    }],
  }, {
    name: 'Herald Shield',
    type: TYPE.SHIELD,
    id: 9,
    tiles: [{
      zone: ZONE.NO4,
      addresses: [ 0x04c324ae, 0x061a73b2 ],
    }],
  }, {
    name: 'Dark Shield',
    type: TYPE.SHIELD,
    id: 10,
    tiles: [{
      zone: ZONE.ST0,
      addresses: [ 0x05341db8, 0x05341f52 ],
      candle: 0x80,
    }, {
      addresses: [ 0x000b8214 ],
      enemy: 126,
    }],
  }, {
    name: 'Goddess Shield',
    type: TYPE.SHIELD,
    id: 11,
    tiles: [{
      zone: ZONE.RNZ0,
      addresses: [ 0x05903076 ],
    }],
  }, {
    name: 'Shaman Shield',
    type: TYPE.SHIELD,
    id: 12,
    tiles: [{
      zone: ZONE.NZ1,
      addresses: [ 0x05573844 ],
    }],
  }, {
    name: 'Medusa Shield',
    type: TYPE.SHIELD,
    id: 13,
    tiles: [{
      addresses: [ 0x000b8eea ],
      enemy: 24,
    }, {
      addresses: [ 0x000b8f12 ],
      enemy: 27,
    }],
  }, {
    name: 'Skull Shield',
    type: TYPE.SHIELD,
    id: 14,
    tiles: [{
      addresses: [ 0x000b872a ],
      enemy: 51,
    }, {
      addresses: [ 0x000b60aa ],
      enemy: 76,
    }, {
      addresses: [ 0x000b6d92 ],
      enemy: 102,
    }],
  }, {
    name: 'Fire Shield',
    type: TYPE.SHIELD,
    id: 15,
    tiles: [{
      addresses: [ 0x000b65fc ],
      enemy: 124,
    }],
  }, {
    name: 'Alucard Shield',
    type: TYPE.SHIELD,
    id: 16,
    tiles: [{
      zone: ZONE.RNO4,
      addresses: [ 0x0526c0e8 ],
    }],
  }, {
    name: 'Sword of Dawn',
    type: TYPE.WEAPON2,
    id: 17,
    tiles: [{
      zone: ZONE.RTOP,
      addresses: [ 0x057e0160 ],
    }],
  }, {
    name: 'Basilard',
    type: TYPE.WEAPON1,
    id: 18,
    tiles: [{
      zone: ZONE.NZ0,
      addresses: [ 0x054b22aa ],
    }, {
      addresses: [ 0x000b5a7a ],
      enemy: 13,
    }],
  }, {
    name: 'Short Sword',
    type: TYPE.WEAPON1,
    id: 19,
    tiles: [{
      addresses: [ 0x000b6b3c ],
      enemy: 9,
    }, {
      addresses: [ 0x04bc9324 ],
      enemy: 9,
      byte: true,
    }],
  }, {
    name: 'Combat Knife',
    type: TYPE.WEAPON1,
    id: 20,
    tiles: [{
      zone: ZONE.CHI,
      addresses: [ 0x045e9606 ],
    }, {
      addresses: [ 0x000b7964 ],
      enemy: 84,
    }],
  }, {
    name: 'Nunchaku',
    type: TYPE.WEAPON2,
    id: 21,
    tiles: [{
      zone: ZONE.NO4,
      addresses: [ 0x04c324e8, 0x061a73ec ],
    }],
  }, {
    name: 'Were Bane',
    type: TYPE.WEAPON1,
    id: 22,
    tiles: [{
      addresses: [ 0x000b80ac ],
      enemy: 60,
    }],
  }, {
    name: 'Rapier',
    type: TYPE.WEAPON1,
    id: 23,
    tiles: [{
      addresses: [ 0x000b5dc4 ],
      enemy: 45,
    }, {
      addresses: [ 0x000b71a2 ],
      enemy: 47,
    }],
  }, {
    name: 'Karma Coin',
    type: TYPE.USABLE,
    id: 24,
    tiles: [{
      zone: ZONE.CHI,
      addresses: [ 0x045e95fe ],
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x044912fe ],
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x04491300 ],
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059bc0d2 ],
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfb6e8 ],
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfb6ea ],
    }, {
      addresses: [ 0x000b70dc ],
      enemy: 114,
    }, {
      addresses: [ 0x000b7322 ],
      enemy: 116,
    }],
  }, {
    name: 'Magic Missile',
    type: TYPE.USABLE,
    id: 25,
    tiles: [{
      zone: ZONE.DAI,
      addresses: [ 0x04676f02 ],
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x05573834 ],
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059bc0d0 ],
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfb6e0 ],
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e322d2 ],
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a30d6 ],
      shop: true,
    }, {
      addresses: [ 0x000b6ac4 ],
      enemy: 26,
    }, {
      addresses: [ 0x000b6bb2 ],
      enemy: 32,
    }, {
      addresses: [ 0x000b7a7c ],
      enemy: 118,
    }],
  }, {
    name: 'Red Rust',
    type: TYPE.WEAPON2,
    id: 26,
    tiles: [{
      addresses: [ 0x000b6b3a ],
      enemy: 9,
    }, {
      addresses: [ 0x04bc9328 ],
      enemy: 9,
      byte: true,
    }],
  }, {
    name: 'Takemitsu',
    type: TYPE.WEAPON2,
    id: 27,
    tiles: [{
      zone: ZONE.LIB,
      addresses: [ 0x047a3912 ],
    }, {
      addresses: [ 0x000b5eb4 ],
      enemy: 23,
    }],
  }, {
    name: 'Shotel',
    type: TYPE.WEAPON1,
    id: 28,
    tiles: [{
      zone: ZONE.RNO1,
      addresses: [ 0x0505016e ],
    }, {
      addresses: [ 0x000b6de4 ],
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
      addresses: [ 0x000b828c ],
      enemy: 73,
    }],
  }, {
    name: 'Banana',
    type: TYPE.USABLE,
    id: 31,
    food: true,
    tiles: [{
      addresses: [ 0x000b669c ],
      enemy: 38,
    }],
  }, {
    name: 'Grapes',
    type: TYPE.USABLE,
    id: 32,
    food: true,
    tiles: [{
      addresses: [ 0x000b748c ],
      enemy: 17,
    }],
  }, {
    name: 'Strawberry',
    type: TYPE.USABLE,
    id: 33,
    food: true,
    tiles: [{
      addresses: [ 0x000b748a ],
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
      zone: ZONE.CHI,
      addresses: [ 0x045e960e ],
    }, {
      zone: ZONE.CHI,
      addresses: [ 0x045e9610 ],
    }, {
      zone: ZONE.CHI,
      addresses: [ 0x045e9612 ],
    }, {
      zone: ZONE.CHI,
      addresses: [ 0x045e9614 ],
    }],
  }, {
    name: 'Toadstool',
    type: TYPE.USABLE,
    id: 36,
    food: true,
    tiles: [{
      zone: ZONE.NO4,
      addresses: [ 0x04c324d4, 0x061a73d8 ],
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c324e2, 0x061a73e6 ],
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526c0ec ],
    }],
  }, {
    name: 'Shiitake',
    type: TYPE.USABLE,
    id: 37,
    food: true,
    tiles: [{
      zone: ZONE.NO4,
      addresses: [ 0x04c324b8, 0x061a73bc ],
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c324d6, 0x061a73da ],
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c324e0, 0x061a73e4 ],
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c324e6, 0x061a73ea ],
    }, {
      zone: ZONE.CHI,
      addresses: [ 0x045e9608 ],
    }, {
      zone: ZONE.CHI,
      addresses: [ 0x045e960a ],
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526c0ea ],
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526c0ee ],
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526c0fa ],
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526c0fc ],
    }, {
      zone: ZONE.RCHI,
      addresses: [ 0x04da5140 ],
    }, {
      zone: ZONE.RCHI,
      addresses: [ 0x04da5142 ],
    }],
  }, {
    name: 'Cheesecake',
    type: TYPE.USABLE,
    id: 38,
    food: true,
    tiles: [{
      addresses: [ 0x000b80aa ],
      enemy: 60,
    }],
  }, {
    name: 'Shortcake',
    type: TYPE.USABLE,
    id: 39,
    food: true,
    tiles: [{
      addresses: [ 0x000b7fba ],
      enemy: 82,
    }],
  }, {
    name: 'Tart',
    type: TYPE.USABLE,
    id: 40,
    food: true,
    tiles: [{
      addresses: [ 0x000b5af2 ],
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
      addresses: [ 0x000b6a4a ],
      enemy: 49,
    }],
  }, {
    name: 'Frankfurter',
    type: TYPE.USABLE,
    id: 44,
    food: true,
    tiles: [{
      zone: ZONE.TOP,
      addresses: [ 0x0560f606 ],
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a3916 ],
    }, {
      addresses: [ 0x000b5aa2 ],
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
      addresses: [ 0x000b6b62 ],
      enemy: 44,
    }, {
      addresses: [ 0x000b6b8a ],
      enemy: 48,
    }],
  }, {
    name: 'Cheese',
    type: TYPE.USABLE,
    id: 47,
    food: true,
    tiles: [{
      zone: ZONE.NO2,
      addresses: [ 0x04aa1560 ],
    }, {
      addresses: [ 0x000b5eb2 ],
      enemy: 23,
    }],
  }, {
    name: 'Ham and eggs',
    type: TYPE.USABLE,
    id: 48,
    food: true,
    tiles: [{
      addresses: [ 0x000b6122 ],
      enemy: 56,
    }, {
      addresses: [ 0x000b6d42 ],
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
      addresses: [ 0x000b7a2a ],
      enemy: 15,
    }],
  }, {
    name: 'Lunch A',
    type: TYPE.USABLE,
    id: 51,
    food: true,
    tiles: [{
      addresses: [ 0x000b87a4 ],
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
      zone: ZONE.DAI,
      addresses: [ 0x046c2658 ],
      despawn: true,
      byte: true,
    }],
  }, {
    name: 'Barley Tea',
    type: TYPE.USABLE,
    id: 57,
    food: true,
    tiles: [{
      zone: ZONE.CHI,
      addresses: [ 0x045e960c ],
    }, {
      addresses: [ 0x000b7a2c ],
      enemy: 15,
    }],
  }, {
    name: 'Green Tea',
    type: TYPE.USABLE,
    id: 58,
    food: true,
    tiles: [{
      zone: ZONE.ARE,
      addresses: [ 0x043c313c ],
    }, {
      zone: ZONE.RCHI,
      addresses: [ 0x04da513a ],
    }, {
      addresses: [ 0x000b6c7a ],
      enemy: 94,
    }, {
      addresses: [ 0x000b5e62 ],
      enemy: 123,
    }],
  }, {
    name: 'Natou',
    type: TYPE.USABLE,
    id: 59,
    food: true,
    tiles: [{
      addresses: [ 0x000b6c2a ],
      enemy: 71,
    }],
  }, {
    name: 'Ramen',
    type: TYPE.USABLE,
    id: 60,
    food: true,
    tiles: [{
      addresses: [ 0x000b920c ],
      enemy: 99,
    }],
  }, {
    name: 'Miso Soup',
    type: TYPE.USABLE,
    id: 61,
    food: true,
    tiles: [{
      addresses: [ 0x000b6c2c ],
      enemy: 71,
    }],
  }, {
    name: 'Sushi',
    type: TYPE.USABLE,
    id: 62,
    food: true,
    tiles: [{
      addresses: [ 0x000b9642 ],
      enemy: 91,
    }, {
      addresses: [ 0x000b5e64 ],
      enemy: 123,
    }],
  }, {
    name: 'Pork Bun',
    type: TYPE.USABLE,
    id: 63,
    food: true,
    tiles: [{
      zone: ZONE.CAT,
      addresses: [ 0x04491302 ],
    }, {
      addresses: [ 0x000b6ca2 ],
      enemy: 53,
    }],
  }, {
    name: 'Red Bean Bun',
    type: TYPE.USABLE,
    id: 64,
    food: true,
    tiles: [{
      zone: ZONE.RCAT,
      addresses: [ 0x04cfb6ec ],
    }, {
      addresses: [ 0x000b6cca ],
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
      zone: ZONE.RNO1,
      addresses: [ 0x0507d08c ],
      despawn: true,
      byte: true,
    }],
  }, {
    name: 'Pot Roast',
    type: TYPE.USABLE,
    id: 67,
    food: true,
    tiles: [{
      zone: ZONE.NO3,
      addresses: [ 0x04ba9774, 0x05431554 ],
      despawn: true,
      byte: true,
    }, {
      zone: ZONE.NO1,
      addresses: [ 0x04a197d8 ],
      despawn: true,
      byte: true,
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x0557379c ],
      despawn: true,
      byte: true,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059bc34c ],
      despawn: true,
      byte: true,
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051e6e4c ],
      despawn: true,
      byte: true,
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x0560f604 ],
      despawn: true,
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c324ca, 0x061a73ce ],
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526c114 ],
    }, {
      addresses: [ 0x000b6442 ],
      enemy: 55,
    }],
  }, {
    name: 'Sirloin',
    type: TYPE.USABLE,
    id: 68,
    food: true,
    tiles: [{
      zone: ZONE.TOP,
      addresses: [ 0x0560f600 ],
    }, {
      addresses: [ 0x000b6f4c ],
      enemy: 81,
    }, {
      addresses: [ 0x000b9d14 ],
      enemy: 112,
    }],
  }, {
    name: 'Turkey',
    type: TYPE.USABLE,
    id: 69,
    food: true,
    tiles: [{
      zone: ZONE.NO3,
      addresses: [ 0x04baa2b0, 0x05431f60 ],
      despawn: true,
      byte: true,
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x0560f5fa ],
      despawn: true,
    }, {
      zone: ZONE.TOP,
      addresses: [ 0x0560f602 ],
    }, {
      zone: ZONE.CHI,
      addresses: [ 0x045e9602 ],
      despawn: true,
    }, {
      addresses: [ 0x000b6124 ],
      enemy: 56,
    }],
  }, {
    name: 'Meal Ticket',
    type: TYPE.USABLE,
    id: 70,
    tiles: [{
      zone: ZONE.NO4,
      addresses: [ 0x04c324bc, 0x061a73c0 ],
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c324be, 0x061a73c2 ],
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c324c0, 0x061a73c4 ],
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c324c2, 0x061a73c6 ],
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f85af6 ],
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526c108 ],
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526c10a ],
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526c10c ],
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526c10e ],
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526c110 ],
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a3126 ],
      shop: true,
    }, {
      addresses: [ 0x000b66ea ],
      enemy: 29,
    }, {
      addresses: [ 0x000b5e3c ],
      enemy: 109,
    }],
  }, {
    name: 'Neutron Bomb',
    type: TYPE.USABLE,
    id: 71,
    tiles: [{
      zone: ZONE.RLIB,
      addresses: [ 0x04ee2f1c ],
    }, {
      zone: ZONE.ST0,
      addresses: [ 0x00119d00 ],
      byte: true,
      reward: true,
    }, {
      addresses: [ 0x000b69fa ],
      enemy: 28,
    }, {
      addresses: [ 0x000b73ec ],
      enemy: 122,
    }],
  }, {
    name: 'Power of Sire',
    type: TYPE.USABLE,
    id: 72,
    tiles: [{
      zone: ZONE.CHI,
      addresses: [ 0x045e95fc ],
    }, {
      zone: ZONE.RCHI,
      addresses: [ 0x04da5134 ],
    }, {
      zone: ZONE.ST0,
      addresses: [ 0x05341dea, 0x05341f84 ],
      candle: 0x90,
    }],
  }, {
    name: 'Pentagram',
    type: TYPE.USABLE,
    id: 73,
    tiles: [{
      zone: ZONE.NZ1,
      addresses: [ 0x05573836 ],
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c324dc, 0x061a73e0 ],
    }, {
      addresses: [ 0x000b5af4 ],
      enemy: 22,
    }, {
      addresses: [ 0x000b819c ],
      enemy: 31,
    }, {
      addresses: [ 0x000b83ca ],
      enemy: 40,
    }],
  }, {
    name: 'Bat Pentagram',
    type: TYPE.USABLE,
    id: 74,
    tiles: [{
      zone: ZONE.RNO4,
      addresses: [ 0x0526c0f2 ],
    }, {
      addresses: [ 0x000b819a ],
      enemy: 31,
    }],
  }, {
    name: 'Shuriken',
    type: TYPE.USABLE,
    id: 75,
    tiles: [{
      zone: ZONE.DAI,
      addresses: [ 0x04676f04 ],
    }, {
      zone: ZONE.DAI,
      addresses: [ 0x04e322c0 ],
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050f87cc ],
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x055737a0 ],
      despawn: true,
      byte: true,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059bc350 ],
      despawn: true,
      byte: true,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a30fe ],
      shop: true,
    }, {
      addresses: [ 0x000b5aa4 ],
      enemy: 104,
    }, {
      addresses: [ 0x000b6cf4 ],
      enemy: 106,
    }],
  }, {
    name: 'Cross Shuriken',
    type: TYPE.USABLE,
    id: 76,
    tiles: [{
      zone: ZONE.CAT,
      addresses: [ 0x044912fa ],
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x044912fc ],
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a3106 ],
      shop: true,
    }, {
      addresses: [ 0x000b6de2 ],
      enemy: 69,
    }],
  }, {
    name: 'Buffalo Star',
    type: TYPE.USABLE,
    id: 77,
    tiles: [{
      zone: ZONE.RCAT,
      addresses: [ 0x04cfb6e2 ],
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x05751558 ],
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a310e ],
      shop: true,
    }, {
      addresses: [ 0x000b7ef4 ],
      enemy: 120,
    }],
  }, {
    name: 'Flame Star',
    type: TYPE.USABLE,
    id: 78,
    tiles: [{
      zone: ZONE.LIB,
      addresses: [ 0x047a3116 ],
      shop: true,
    }, {
      addresses: [ 0x000b6cf2 ],
      enemy: 106,
    }],
  }, {
    name: 'TNT',
    type: TYPE.USABLE,
    id: 79,
    tiles: [{
      zone: ZONE.DAI,
      addresses: [ 0x04676f06 ],
    }, {
      zone: ZONE.DAI,
      addresses: [ 0x04e322c2 ],
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x055737a8 ],
      despawn: true,
      byte: true,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059bc358 ],
      despawn: true,
      byte: true,
    }, {
      addresses: [ 0x000b669a ],
      enemy: 38,
    }, {
      addresses: [ 0x000b75cc ],
      enemy: 103,
    }],
  }, {
    name: 'Bwaka Knife',
    type: TYPE.USABLE,
    id: 80,
    tiles: [{
      zone: ZONE.RDAI,
      addresses: [ 0x04e322d0 ],
    }, {
      zone: ZONE.NZ1,
      addresses: [ 0x055737a4 ],
      despawn: true,
      byte: true,
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059bc354 ],
      despawn: true,
      byte: true,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a30de ],
      shop: true,
    }],
  }, {
    name: 'Boomerang',
    type: TYPE.USABLE,
    id: 81,
    tiles: [{
      zone: ZONE.DAI,
      addresses: [ 0x04676f08 ],
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e322c4 ],
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a30e6 ],
      shop: true,
    }, {
      addresses: [ 0x000b5a2c ],
      enemy: 16,
    }],
  }, {
    name: 'Javelin',
    type: TYPE.USABLE,
    id: 82,
    tiles: [{
      zone: ZONE.RDAI,
      addresses: [ 0x04e322c6 ],
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a30ee ],
      shop: true,
    }, {
      addresses: [ 0x000b682c ],
      enemy: 39,
    }, {
      addresses: [ 0x000b6ed2 ],
      enemy: 41,
    }, {
      addresses: [ 0x000b6d44 ],
      enemy: 58,
    }, {
      addresses: [ 0x000b91e4 ],
      enemy: 97,
    }],
  }, {
    name: 'Tyrfing',
    type: TYPE.WEAPON1,
    id: 83,
    tiles: [{
      zone: ZONE.TOP,
      addresses: [ 0x0560f5fe ],
    }],
  }, {
    name: 'Namakura',
    type: TYPE.WEAPON2,
    id: 84,
    tiles: [{
      addresses: [ 0x000b6e32 ],
      enemy: 25,
    }],
  }, {
    name: 'Knuckle Duster',
    type: TYPE.WEAPON1,
    id: 85,
    tiles: [{
      zone: ZONE.NO4,
      addresses: [ 0x04c324ce, 0x061a73d2 ],
    }, {
      addresses: [ 0x000b6b8c ],
      enemy: 48,
    }],
  }, {
    name: 'Gladius',
    type: TYPE.WEAPON1,
    id: 86,
    tiles: [{
      zone: ZONE.NO1,
      addresses: [ 0x049d367c ],
    }],
  }, {
    name: 'Scimitar',
    type: TYPE.WEAPON1,
    id: 87,
    tiles: [{
      zone: ZONE.NO4,
      addresses: [ 0x04c324c6, 0x061a73ca ],
    }, {
      addresses: [ 0x000b872c ],
      enemy: 51,
    }],
  }, {
    name: 'Cutlass',
    type: TYPE.WEAPON1,
    id: 88,
    tiles: [{
      zone: ZONE.DAI,
      addresses: [ 0x04676f14 ],
    }, {
      addresses: [ 0x000b59dc ],
      enemy: 43,
    }, {
      addresses: [ 0x000b7824 ],
      enemy: 46,
    }, {
      addresses: [ 0x000b5b94 ],
      enemy: 62,
    }],
  }, {
    name: 'Saber',
    type: TYPE.WEAPON1,
    id: 89,
    tiles: [{
      zone: ZONE.LIB,
      addresses: [ 0x047a312e ],
      shop: true,
    }, {
      addresses: [ 0x000b5dc2 ],
      enemy: 45,
    }, {
      addresses: [ 0x000b859a ],
      enemy: 50,
    }],
  }, {
    name: 'Falchion',
    type: TYPE.WEAPON1,
    id: 90,
    tiles: [{
      zone: ZONE.TOP,
      addresses: [ 0x0560f610 ],
    }],
  }, {
    name: 'Broadsword',
    type: TYPE.WEAPON1,
    id: 91,
    tiles: [{
      zone: ZONE.NO2,
      addresses: [ 0x04aa155c ],
    }, {
      addresses: [ 0x000b6efc ],
      enemy: 57,
    }, {
      addresses: [ 0x000b7014 ],
      enemy: 63,
    }],
  }, {
    name: 'Bekatowa',
    type: TYPE.WEAPON1,
    id: 92,
    tiles: [{
      zone: ZONE.NZ1,
      addresses: [ 0x05573842 ],
    }, {
      addresses: [ 0x000b59da ],
      enemy: 43,
    }],
  }, {
    name: 'Damascus Sword',
    type: TYPE.WEAPON1,
    id: 93,
    tiles: [{
      zone: ZONE.LIB,
      addresses: [ 0x047a313e ],
      shop: true,
    }, {
      addresses: [ 0x000b7822 ],
      enemy: 46,
    }],
  }, {
    name: 'Hunter Sword',
    type: TYPE.WEAPON1,
    id: 94,
    tiles: [{
      addresses: [ 0x000b79b4 ],
      enemy: 83,
    }],
  }, {
    name: 'Estoc',
    type: TYPE.WEAPON2,
    id: 95,
    tiles: [{
      zone: ZONE.NO2,
      addresses: [ 0x04aa1698 ],
    }, {
      addresses: [ 0x000b6f9c ],
      enemy: 77,
    }],
  }, {
    name: 'Bastard Sword',
    type: TYPE.WEAPON1,
    id: 96,
    tiles: [{
      zone: ZONE.RTOP,
      addresses: [ 0x057e0168 ],
    }, {
      addresses: [ 0x000b6efa ],
      enemy: 57,
    }, {
      addresses: [ 0x000b7012 ],
      enemy: 63,
    }],
  }, {
    name: 'Jewel Knuckles',
    type: TYPE.WEAPON1,
    id: 97,
    tiles: [{
      zone: ZONE.NO1,
      addresses: [ 0x049d3674 ],
    }, {
      addresses: [ 0x000b761c ],
      enemy: 117,
    }],
  }, {
    name: 'Claymore',
    type: TYPE.WEAPON2,
    id: 98,
    tiles: [{
      zone: ZONE.NO4,
      addresses: [ 0x04c324ba, 0x061a73be ],
    }, {
      addresses: [ 0x000b6f9a ],
      enemy: 77,
    }],
  }, {
    name: 'Talwar',
    type: TYPE.WEAPON1,
    id: 99,
    tiles: [{
      zone: ZONE.RDAI,
      addresses: [ 0x04e322ce ],
    }],
  }, {
    name: 'Katana',
    id: 100,
    type: TYPE.WEAPON2,
    tiles: [{
      zone: ZONE.RNZ0,
      addresses: [ 0x0590307a ],
    }, {
      addresses: [ 0x000b6c7c ],
      enemy: 94,
    }],
  }, {
    name: 'Flamberge',
    type: TYPE.WEAPON2,
    id: 101,
    tiles: [{
      addresses: [ 0x000b88bc ],
      enemy: 78,
    }],
  }, {
    name: 'Iron Fist',
    type: TYPE.WEAPON1,
    id: 102,
    tiles: [{
      addresses: [ 0x000b9d8c ],
      enemy: 108,
    }],
  }, {
    name: 'Zwei Hander',
    type: TYPE.WEAPON2,
    id: 103,
    tiles: [{
      addresses: [ 0x000b9e04 ],
      enemy: 128,
    }],
  }, {
    name: 'Sword of Hador',
    type: TYPE.WEAPON1,
    id: 104,
    tiles: [{
      zone: ZONE.RNO2,
      addresses: [ 0x050f87ba ],
    }],
  }, {
    name: 'Luminus',
    type: TYPE.WEAPON1,
    id: 105,
    tiles: [{
      zone: ZONE.RNZ1,
      addresses: [ 0x059bc0d6 ],
    }],
  }, {
    name: 'Harper',
    type: TYPE.WEAPON1,
    id: 106,
    tiles: [{
      zone: ZONE.LIB,
      addresses: [ 0x047a315e ],
      shop: true,
    }],
  }, {
    name: 'Obsidian Sword',
    type: TYPE.WEAPON2,
    id: 107,
    tiles: [{
      addresses: [ 0x000b5c0c ],
      enemy: 80,
    }],
  }, {
    name: 'Gram',
    type: TYPE.WEAPON1,
    id: 108,
    tiles: [{
      zone: ZONE.RARE,
      addresses: [ 0x0575155a ],
    }],
  }, {
    name: 'Jewel Sword',
    type: TYPE.WEAPON1,
    id: 109,
    tiles: [{
      zone: ZONE.NO3,
      addresses: [ 0x04b68616, 0x053f5f92 ],
    }, {
      addresses: [ 0x000b65aa ],
      enemy: 86,
    }],
  }, {
    name: 'Mormegil',
    type: TYPE.WEAPON1,
    id: 110,
    tiles: [{
      zone: ZONE.CAT,
      addresses: [ 0x044912ea ],
    }],
  }, {
    name: 'Firebrand',
    type: TYPE.WEAPON1,
    id: 111,
    tiles: [{
      zone: ZONE.LIB,
      addresses: [ 0x047a3146 ],
      shop: true,
    }, {
      zone: ZONE.ST0,
      addresses: [ 0x05341dc2, 0x05341f5c ],
      candle: 0x80,
    }, {
      addresses: [ 0x000b6f4a ],
      enemy: 81,
    }],
  }, {
    name: 'Thunderbrand',
    type: TYPE.WEAPON1,
    id: 112,
    tiles: [{
      zone: ZONE.LIB,
      addresses: [ 0x047a3156 ],
      shop: true,
    }],
  }, {
    name: 'Icebrand',
    type: TYPE.WEAPON1,
    id: 113,
    tiles: [{
      zone: ZONE.CAT,
      addresses: [ 0x044912e6 ],
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a314e ],
      shop: true,
    }, {
      addresses: [ 0x000b89aa ],
      enemy: 79,
    }],
  }, {
    name: 'Stone Sword',
    type: TYPE.WEAPON1,
    id: 114,
    tiles: [{
      addresses: [ 0x000b5d4a ],
      enemy: 125,
    }],
  }, {
    name: 'Holy Sword',
    type: TYPE.WEAPON1,
    id: 115,
    tiles: [{
      zone: ZONE.ARE,
      addresses: [ 0x043c313e ],
    }, {
      addresses: [ 0x000b80d4 ],
      enemy: 64,
    }],
  }, {
    name: 'Terminus Est',
    type: TYPE.WEAPON1,
    id: 116,
    tiles: [{
      addresses: [ 0x000b6e82 ],
      enemy: 113,
    }],
  }, {
    name: 'Marsil',
    type: TYPE.WEAPON1,
    id: 117,
    tiles: [{
      addresses: [ 0x000b65fa ],
      enemy: 124,
    }],
  }, {
    name: 'Dark Blade',
    type: TYPE.WEAPON1,
    id: 118,
    tiles: [{
      zone: ZONE.RARE,
      addresses: [ 0x0526c116 ],
    }],
  }, {
    name: 'Heaven Sword',
    type: TYPE.WEAPON1,
    id: 119,
    tiles: [{
      addresses: [ 0x000b88ba ],
      enemy: 78,
    }],
  }, {
    name: 'Fist of Tulkas',
    type: TYPE.WEAPON1,
    id: 120,
    tiles: [{
      addresses: [ 0x000b8752 ],
      enemy: 96,
    }],
  }, {
    name: 'Gurthang',
    type: TYPE.WEAPON1,
    id: 121,
    tiles: [{
      addresses: [ 0x000b7064 ],
      enemy: 119,
    }],
  }, {
    name: 'Mourneblade',
    type: TYPE.WEAPON1,
    id: 122,
    tiles: [{
      addresses: [ 0x000b8032 ],
      enemy: 137,
    }],
  }, {
    name: 'Alucard Sword',
    type: TYPE.WEAPON1,
    id: 123,
    tiles: [{
      zone: ZONE.RCHI,
      addresses: [ 0x04da5138 ],
    }],
  }, {
    name: 'Mablung Sword',
    type: TYPE.WEAPON1,
    id: 124,
    tiles: [{
      addresses: [ 0x000b7062 ],
      enemy: 119,
    }],
  }, {
    name: 'Badelaire',
    type: TYPE.WEAPON1,
    id: 125,
    tiles: [{
      zone: ZONE.RLIB,
      addresses: [ 0x04ee2f1e ],
    }, {
      zone: ZONE.ST0,
      addresses: [ 0x05341c7e, 0x05341f48 ],
      candle: 0x90,
    }],
  }, {
    name: 'Great Sword',
    type: TYPE.WEAPON2,
    id: 127,
    tiles: [{
      addresses: [ 0x000b9ea4 ],
      enemy: 143,
    }],
  }, {
    name: 'Mace',
    type: TYPE.WEAPON1,
    id: 128,
    tiles: [{
      zone: ZONE.LIB,
      addresses: [ 0x047a3136 ],
      shop: true,
    }],
  }, {
    name: 'Morning Star',
    type: TYPE.WEAPON1,
    id: 129,
    tiles: [{
      zone: ZONE.DAI,
      addresses: [ 0x04676efa ],
    }, {
      addresses: [ 0x000b6444 ],
      enemy: 55,
    }],
  }, {
    name: 'Holy Rod',
    type: TYPE.WEAPON1,
    id: 130,
    tiles: [{
      zone: ZONE.LIB,
      addresses: [ 0x047a390c ],
    }],
  }, {
    name: 'Star Flail',
    type: TYPE.WEAPON1,
    id: 131,
    tiles: [{
      zone: ZONE.NZ1,
      addresses: [ 0x0557383a ],
    }],
  }, {
    name: 'Moon Rod',
    type: TYPE.WEAPON1,
    id: 132,
    tiles: [{
      zone: ZONE.RNZ1,
      addresses: [ 0x059bc0e6 ],
    }, {
      zone: ZONE.ST0,
      addresses: [ 0x05341c74, 0x05341f3e ],
      candle: 0x90,
    }],
  }, {
    name: 'Chakram',
    type: TYPE.WEAPON1,
    id: 133,
    tiles: [{
      addresses: [ 0x000b65ac ],
      enemy: 86,
    }],
  }, {
    name: 'Fire Boomerang',
    type: TYPE.USABLE,
    id: 134,
    tiles: [{
      zone: ZONE.RNO3,
      addresses: [ 0x051ad7a6 ],
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e322b8 ],
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a30f6 ],
      shop: true,
    }, {
      addresses: [ 0x000b5a2a ],
      enemy: 16,
    }],
  }, {
    name: 'Iron Ball',
    type: TYPE.USABLE,
    id: 135,
    tiles: [{
      zone: ZONE.NO2,
      addresses: [ 0x04aa169a ],
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e0162 ],
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f85af8 ],
    }, {
      addresses: [ 0x000b69fc ],
      enemy: 28,
    }],
  }, {
    name: 'Holbein Dagger',
    type: TYPE.WEAPON1,
    id: 136,
    tiles: [{
      addresses: [ 0x000b5c0a ],
      enemy: 80,
    }],
  }, {
    name: 'Blue Knuckles',
    type: TYPE.WEAPON1,
    id: 137,
    tiles: [{
      addresses: [ 0x000b6b64 ],
      enemy: 44,
    }],
  }, {
    name: 'Dynamite',
    type: TYPE.USABLE,
    id: 138,
    tiles: [{
      addresses: [ 0x000b75ca ],
      enemy: 103,
    }],
  }, {
    name: 'Osafune Katana',
    type: TYPE.WEAPON2,
    id: 139,
    tiles: [{
      zone: ZONE.RNO4,
      addresses: [ 0x0526c11c ],
    }],
  }, {
    name: 'Masamune',
    type: TYPE.WEAPON2,
    id: 140,
    tiles: [{
      addresses: [ 0x000b5e3a ],
      enemy: 109,
    }],
  }, {
    name: 'Muramasa',
    type: TYPE.WEAPON2,
    id: 141,
    tiles: [{
      addresses: [ 0x000b80d2 ],
      enemy: 64,
    }, {
      addresses: [ 0x000b91e2 ],
      enemy: 97,
    }],
  }, {
    name: 'Heart Refresh',
    type: TYPE.USABLE,
    id: 142,
    tiles: [{
      zone: ZONE.RNO0,
      addresses: [ 0x04f85afa ],
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050f87ca ],
    }, {
      zone: ZONE.ST0,
      addresses: [ 0x00119ca4 ],
      byte: true,
      reward: true,
    }, {
      zone: ZONE.ST0,
      addresses: [ 0x05341dcc, 0x05341f66 ],
      candle: 0x80,
    }, {
      addresses: [ 0x000b752a ],
      enemy: 95,
    }, {
      addresses: [ 0x000b8f3c ],
      enemy: 107,
    }, {
      addresses: [ 0x000b9e02 ],
      enemy: 128,
    }],
  }, {
    name: 'Runesword',
    type: TYPE.WEAPON1,
    id: 143,
    tiles: [{
      addresses: [ 0x000b6b12 ],
      enemy: 141,
    }],
  }, {
    name: 'Antivenom',
    type: TYPE.USABLE,
    id: 144,
    tiles: [{
      zone: ZONE.LIB,
      addresses: [ 0x047a391a ],
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c324a8, 0x061a73ac ],
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f85ae8 ],
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051ad79a ],
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a30be ],
      shop: true,
    }, {
      addresses: [ 0x000b7462 ],
      enemy: 19,
    }, {
      addresses: [ 0x000b789c ],
      enemy: 33,
    }, {
      addresses: [ 0x000b74b4 ],
      enemy: 54,
    }],
  }, {
    name: 'Uncurse',
    type: TYPE.USABLE,
    id: 145,
    tiles: [{
      zone: ZONE.LIB,
      addresses: [ 0x047a30c6 ],
      shop: true,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a5658, 0x047a5eae ],
      candle: 0x00,
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a58c4, 0x047a6098 ],
      candle: 0x00,
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee4376, 0x04ee49e2 ],
      candle: 0x00,
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee4434, 0x04ee4b0e ],
      candle: 0x00,
    }, {
      addresses: [ 0x000b6764 ],
      enemy: 42,
    }],
  }, {
    name: 'Life Apple',
    type: TYPE.USABLE,
    id: 146,
    tiles: [{
      zone: ZONE.NO3,
      addresses: [ 0x04b68608, 0x053f5f84 ],
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fad9e ],
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059bc0de ],
    }, {
      zone: ZONE.RCHI,
      addresses: [ 0x04da5136 ],
    }, {
      addresses: [ 0x000b828a ],
      enemy: 73,
    }],
  }, {
    name: 'Hammer',
    type: TYPE.USABLE,
    id: 147,
    tiles: [{
      zone: ZONE.NO0,
      addresses: [ 0x048fada0 ],
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fadb0 ],
    }, {
      zone: ZONE.RNO1,
      addresses: [ 0x05050170 ],
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051ad798 ],
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a30ce ],
      shop: true,
    }, {
      addresses: [ 0x000b7914 ],
      enemy: 85,
    }, {
      addresses: [ 0x000b5d4c ],
      enemy: 125,
    }],
  }, {
    name: 'Str. potion',
    type: TYPE.USABLE,
    id: 148,
    tiles: [{
      zone: ZONE.NO0,
      addresses: [ 0x048fadb2 ],
    }, {
      zone: ZONE.DAI,
      addresses: [ 0x04676f0e ],
    }, {
      zone: ZONE.RNZ1,
      addresses: [ 0x059bc0d4 ],
    }, {
      addresses: [ 0x000b632c ],
      enemy: 70,
    }],
  }, {
    name: 'Luck potion',
    type: TYPE.USABLE,
    id: 149,
    tiles: [{
      zone: ZONE.NO2,
      addresses: [ 0x04aa1566 ],
    }, {
      zone: ZONE.RNO1,
      addresses: [ 0x05050174 ],
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050f87c0 ],
    }, {
      addresses: [ 0x000b7874 ],
      enemy: 105,
    }, {
      addresses: [ 0x000b8ac4 ],
      enemy: 134,
    }],
  }, {
    name: 'Smart potion',
    type: TYPE.USABLE,
    id: 150,
    tiles: [{
      zone: ZONE.RNZ1,
      addresses: [ 0x059bc0d8 ],
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e322ca ],
    }, {
      addresses: [ 0x000b614c ],
      enemy: 20,
    }],
  }, {
    name: 'Attack potion',
    type: TYPE.USABLE,
    id: 151,
    tiles: [{
      zone: ZONE.NO0,
      addresses: [ 0x048fadae ],
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfb6f8 ],
    }],
  }, {
    name: 'Shield Potion',
    type: TYPE.USABLE,
    id: 152,
    tiles: [{
      zone: ZONE.NO3,
      addresses: [ 0x04b6860c, 0x053f5f88 ],
    }, {
      zone: ZONE.RNO1,
      addresses: [ 0x05050176 ],
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfb6f6 ],
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050f87be ],
    }, {
      addresses: [ 0x000b655c ],
      enemy: 7,
    }],
  }, {
    name: 'Resist Fire',
    type: TYPE.USABLE,
    id: 153,
    tiles: [{
      zone: ZONE.NO2,
      addresses: [ 0x04aa1564 ],
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e0182 ],
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee2f16 ],
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f85af4 ],
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfb6e6 ],
    }, {
      addresses: [ 0x000b805c ],
      enemy: 72,
    }],
  }, {
    name: 'Resist Thunder',
    type: TYPE.USABLE,
    id: 154,
    tiles: [{
      zone: ZONE.NZ0,
      addresses: [ 0x054b22a6 ],
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e0186 ],
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f85af2 ],
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfb6e4 ],
    }],
  }, {
    name: 'Resist Ice',
    type: TYPE.USABLE,
    id: 155,
    tiles: [{
      zone: ZONE.NO4,
      addresses: [ 0x04c324c8, 0x061a73cc ],
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e0184 ],
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x04ee2f18 ],
    }, {
      addresses: [ 0x000b89ac ],
      enemy: 79,
    }],
  }, {
    name: 'Resist Stone',
    type: TYPE.USABLE,
    id: 156,
    tiles: [{
      zone: ZONE.TOP,
      addresses: [ 0x0560f608 ],
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e0188 ],
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x04ee2f1a ],
    }, {
      addresses: [ 0x000b8eec ],
      enemy: 24,
    }, {
      addresses: [ 0x000b8f14 ],
      enemy: 27,
    }],
  }, {
    name: 'Resist Holy',
    type: TYPE.USABLE,
    id: 157,
    tiles: [{
      zone: ZONE.TOP,
      addresses: [ 0x0560f60c ],
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f85af0 ],
    }],
  }, {
    name: 'Resist Dark',
    type: TYPE.USABLE,
    id: 158,
    tiles: [{
      zone: ZONE.TOP,
      addresses: [ 0x0560f60a ],
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f85aee ],
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05903082 ],
    }, {
      addresses: [ 0x000b641a ],
      enemy: 36,
    }, {
      addresses: [ 0x000b8a24 ],
      enemy: 87,
    }],
  }, {
    name: 'Potion',
    type: TYPE.USABLE,
    id: 159,
    tiles: [{
      zone: ZONE.NZ0,
      addresses: [ 0x054b22ac ],
    }, {
      zone: ZONE.DAI,
      addresses: [ 0x04676f16 ],
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a3918 ],
    }, {
      zone: ZONE.NO0,
      addresses: [ 0x048fada2 ],
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f85ae6 ],
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526c0f8 ],
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a309e ],
      shop: true,
    }, {
      zone: ZONE.ST0,
      addresses: [ 0x00119bb8 ],
      byte: true,
      reward: true,
    }, {
      addresses: [ 0x000b63a4 ],
      enemy: 3,
    }, {
      addresses: [ 0x000b74b2 ],
      enemy: 54,
    }],
  }, {
    name: 'High Potion',
    type: TYPE.USABLE,
    id: 160,
    tiles: [{
      zone: ZONE.RTOP,
      addresses: [ 0x057e018a ],
    }, {
      zone: ZONE.RNO1,
      addresses: [ 0x05050178 ],
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051ad79c ],
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x0590307c ],
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050f87bc ],
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a30a6 ],
      shop: true,
    }, {
      addresses: [ 0x000b5edc ],
      enemy: 65,
    }],
  }, {
    name: 'Elixir',
    type: TYPE.USABLE,
    id: 161,
    tiles: [{
      zone: ZONE.NO4,
      addresses: [ 0x04c324d2, 0x061a73d6 ],
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526c11a ],
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfb6ee ],
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a30ae ],
      shop: true,
    }],
  }, {
    name: 'Manna Prism',
    type: TYPE.USABLE,
    id: 162,
    tiles: [{
      zone: ZONE.NO2,
      addresses: [ 0x04aa1562 ],
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526c118 ],
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x05903078 ],
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e322c8 ],
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050f87c2 ],
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a30b6 ],
      shop: true,
    }, {
      addresses: [ 0x000b6762 ],
      enemy: 42,
    }, {
      addresses: [ 0x000b80fa ],
      enemy: 139,
    }],
  }, {
    name: 'Library Card',
    type: TYPE.USABLE,
    id: 166,
    tiles: [{
      zone: ZONE.NO0,
      addresses: [ 0x048fadac ],
    }, {
      zone: ZONE.CAT,
      addresses: [ 0x044912ec ],
    }, {
      zone: ZONE.ARE,
      addresses: [ 0x043c313a ],
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e0190 ],
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee2f14 ],
    }, {
      zone: ZONE.RNO0,
      addresses: [ 0x04f85ae4 ],
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfb6f0 ],
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047a311e ],
      shop: true,
    }],
  }, {
    name: 'Vorpal Blade',
    type: TYPE.WEAPON1,
    id: 163,
    tiles: [{
      addresses: [ 0x000b8f3a ],
      enemy: 107,
    }],
  }, {
    name: 'Crissaegrim',
    type: TYPE.WEAPON1,
    id: 164,
    tiles: [{
      addresses: [ 0x000b920a ],
      enemy: 99,
    }],
  }, {
    name: 'Yusutsuna',
    type: TYPE.WEAPON2,
    id: 165,
    tiles: [{
      addresses: [ 0x000b9d8a ],
      enemy: 108,
    }],
  }, {
    name: 'Alucart Shield',
    type: TYPE.SHIELD,
    id: 167,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.NO0,
      addresses: [ 0x048fad9a ],
    }],
  }, {
    name: 'Alucart Sword',
    type: TYPE.WEAPON1,
    id: 168,
    tiles: [{
      zone: ZONE.NO0,
      addresses: [ 0x048fada6 ],
    }],
  }, {
    name: 'Cloth Tunic',
    type: TYPE.ARMOR,
    id: 170,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      addresses: [ 0x000b6c02 ],
      enemy: 5,
    }, {
      addresses: [ 0x000b5a7c ],
      enemy: 13,
    }],
  }, {
    name: 'Hide cuirass',
    type: TYPE.ARMOR,
    id: 171,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.NZ0,
      addresses: [ 0x054b2298 ],
    }, {
      addresses: [ 0x000b71a4 ],
      enemy: 47,
    }],
  }, {
    name: 'Bronze Cuirass',
    type: TYPE.ARMOR,
    id: 172,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.LIB,
      addresses: [ 0x047a3910 ],
    }, {
      addresses: [ 0x000b83a2 ],
      enemy: 12,
    }],
  }, {
    name: 'Iron Cuirass',
    type: TYPE.ARMOR,
    id: 173,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.LIB,
      addresses: [ 0x047a3196 ],
      shop: true,
    }, {
      addresses: [ 0x000b682a ],
      enemy: 39,
    }, {
      addresses: [ 0x000b5eda ],
      enemy: 65,
    }],
  }, {
    name: 'Steel Cuirass',
    type: TYPE.ARMOR,
    id: 174,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.LIB,
      addresses: [ 0x047a319e ],
      shop: true,
    }],
  }, {
    name: 'Silver Plate',
    type: TYPE.ARMOR,
    id: 175,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.DAI,
      addresses: [ 0x04676f0c ],
    }],
  }, {
    name: 'Gold Plate',
    type: TYPE.ARMOR,
    id: 176,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.NZ1,
      addresses: [ 0x0557383c ],
    }, {
      addresses: [ 0x000b79b2 ],
      enemy: 83,
    }, {
      addresses: [ 0x000b7962 ],
      enemy: 84,
    }, {
      addresses: [ 0x000b7912 ],
      enemy: 85,
    }],
  }, {
    name: 'Platinum Mail',
    type: TYPE.ARMOR,
    id: 177,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.TOP,
      addresses: [ 0x0560f60e ],
    }, {
      addresses: [ 0x000b761a ],
      enemy: 117,
    }],
  }, {
    name: 'Diamond Plate',
    type: TYPE.ARMOR,
    id: 178,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.LIB,
      addresses: [ 0x047a31a6 ],
      shop: true,
    }],
  }, {
    name: 'Fire Mail',
    type: TYPE.ARMOR,
    id: 179,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.TOP,
      addresses: [ 0x0560f5fc ],
    }, {
      addresses: [ 0x000b805a ],
      enemy: 72,
    }, {
      addresses: [ 0x000b64ba ],
      enemy: 89,
    }],
  }, {
    name: 'Lightning Mail',
    type: TYPE.ARMOR,
    id: 180,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.RTOP,
      addresses: [ 0x057e018e ],
    }, {
      addresses: [ 0x000b64bc ],
      enemy: 89,
    }],
  }, {
    name: 'Ice Mail',
    type: TYPE.ARMOR,
    id: 181,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.NZ1,
      addresses: [ 0x05573846 ],
    }, {
      addresses: [ 0x000b6a4c ],
      enemy: 49,
    }],
  }, {
    name: 'Mirror Cuirass',
    type: TYPE.ARMOR,
    id: 182,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.NO1,
      addresses: [ 0x049d3676 ],
    }],
  }, {
    name: 'Spike Breaker',
    type: TYPE.ARMOR,
    id: 183,
    progression: true,
    tiles: [{
      zone: ZONE.CAT,
      addresses: [ 0x04491304 ],
    }],
  }, {
    name: 'Alucard Mail',
    type: TYPE.ARMOR,
    id: 184,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.RNO2,
      addresses: [ 0x050f87c6 ],
    }],
  }, {
    name: 'Dark Armor',
    type: TYPE.ARMOR,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    id: 185,
    tiles: [{
      addresses: [ 0x000b8212 ],
      enemy: 126,
    }],
  }, {
    name: 'Healing Mail',
    type: TYPE.ARMOR,
    id: 186,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.NZ1,
      addresses: [ 0x05573840 ],
    }],
  }, {
    name: 'Holy Mail',
    type: TYPE.ARMOR,
    id: 187,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.NO3,
      addresses: [ 0x04b6860e, 0x053f5f8a ],
    }],
  }, {
    name: 'Walk Armor',
    type: TYPE.ARMOR,
    id: 188,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.CAT,
      addresses: [ 0x044912e8 ],
    }],
  }, {
    name: 'Brilliant Mail',
    type: TYPE.ARMOR,
    id: 189,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      addresses: [ 0x000b7a7a ],
      enemy: 118,
    }],
  }, {
    name: 'Mojo Mail',
    type: TYPE.ARMOR,
    id: 190,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      addresses: [ 0x000b87a2 ],
      enemy: 100,
    }],
  }, {
    name: 'Fury Plate',
    type: TYPE.ARMOR,
    id: 191,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.RARE,
      addresses: [ 0x05751554 ],
    }, {
      addresses: [ 0x000b9d12 ],
      enemy: 112,
    }],
  }, {
    name: 'Dracula Tunic',
    type: TYPE.ARMOR,
    id: 192,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.LIB,
      addresses: [ 0x047d9370 ],
      byte: true,
      librarian: true,
    }],
  }, {
    name: 'God\'s Garb',
    type: TYPE.ARMOR,
    id: 193,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      addresses: [ 0x000b9ea2 ],
      enemy: 143,
    }],
  }, {
    name: 'Axe Lord Armor',
    type: TYPE.ARMOR,
    id: 194,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.LIB,
      addresses: [ 0x047d9284 ],
      byte: true,
      librarian: true,
    }],
  }, {
    name: 'Sunglasses',
    type: TYPE.HELMET,
    id: 196,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.NZ0,
      addresses: [ 0x054b22a4 ],
    }, {
      zone: ZONE.ST0,
      addresses: [ 0x05341de0, 0x05341f7a ],
      candle: 0x90,
    }],
  }, {
    name: 'Ballroom Mask',
    type: TYPE.HELMET,
    id: 197,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.CAT,
      addresses: [ 0x044912f2 ],
    }, {
      addresses: [ 0x000b789a ],
      enemy: 33,
    }],
  }, {
    name: 'Bandana',
    type: TYPE.HELMET,
    id: 198,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.NO4,
      addresses: [ 0x04c324b6, 0x061a73ba ],
    }],
  }, {
    name: 'Felt Hat',
    type: TYPE.HELMET,
    id: 199,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      addresses: [ 0x000b641c ],
      enemy: 36,
    }],
  }, {
    name: 'Velvet Hat',
    type: TYPE.HELMET,
    id: 200,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.LIB,
      addresses: [ 0x047a3176 ],
      shop: true,
    }],
  }, {
    name: 'Goggles',
    type: TYPE.HELMET,
    id: 201,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.DAI,
      addresses: [ 0x04676f0a ],
    }],
  }, {
    name: 'Leather Hat',
    type: TYPE.HELMET,
    id: 202,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.LIB,
      addresses: [ 0x047a317e ],
      shop: true,
    }],
  }, {
    name: 'Steel Helm',
    type: TYPE.HELMET,
    id: 204,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.NZ1,
      addresses: [ 0x0557383e ],
    }],
  }, {
    name: 'Stone Mask',
    type: TYPE.HELMET,
    id: 205,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.LIB,
      addresses: [ 0x047a390a ],
    }, {
      addresses: [ 0x000b7ef2 ],
      enemy: 120,
    }],
  }, {
    name: 'Circlet',
    type: TYPE.HELMET,
    id: 206,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.LIB,
      addresses: [ 0x047a3186 ],
      shop: true,
    }, {
      addresses: [ 0x000b614a ],
      enemy: 20,
    }],
  }, {
    name: 'Gold Circlet',
    type: TYPE.HELMET,
    id: 207,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      addresses: [ 0x000b7fbc ],
      enemy: 82,
    }],
  }, {
    name: 'Ruby Circlet',
    type: TYPE.HELMET,
    id: 208,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.RCAT,
      addresses: [ 0x04cfb702 ],
    }],
  }, {
    name: 'Opal Circlet',
    type: TYPE.HELMET,
    id: 209,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      addresses: [ 0x000b7f1a ],
      enemy: 138,
    }],
  }, {
    name: 'Topaz Circlet',
    type: TYPE.HELMET,
    id: 210,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.LIB,
      addresses: [ 0x047a391c ],
    }],
  }, {
    name: 'Beryl Circlet',
    type: TYPE.HELMET,
    id: 211,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.RNO3,
      addresses: [ 0x051ad7a4 ],
    }],
  }, {
    name: 'Cat-eye Circlet',
    type: TYPE.HELMET,
    id: 212,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.CAT,
      addresses: [ 0x044912e4 ],
    }],
  }, {
    name: 'Coral Circlet',
    type: TYPE.HELMET,
    id: 213,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      addresses: [ 0x000b752c ],
      enemy: 95,
    }],
  }, {
    name: 'Dragon Helm',
    type: TYPE.HELMET,
    id: 214,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.RNZ1,
      addresses: [ 0x059bc0da ],
    }],
  }, {
    name: 'Silver Crown',
    type: TYPE.HELMET,
    id: 215,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.LIB,
      addresses: [ 0x047a318e ],
      shop: true,
    }],
  }, {
    name: 'Wizard Hat',
    type: TYPE.HELMET,
    id: 216,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      addresses: [ 0x000b80fc ],
      enemy: 139,
    }],
  }, {
    name: 'Cloth Cape',
    type: TYPE.CLOAK,
    id: 218,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.NZ0,
      addresses: [ 0x054b229c ],
    }],
  }, {
    name: 'Reverse Cloak',
    type: TYPE.CLOAK,
    id: 219,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.LIB,
      addresses: [ 0x047a31ae ],
      shop: true,
    }],
  }, {
    name: 'Elven Cloak',
    type: TYPE.CLOAK,
    id: 220,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.LIB,
      addresses: [ 0x047a31b6 ],
      shop: true,
    }],
  }, {
    name: 'Crystal Cloak',
    type: TYPE.CLOAK,
    id: 221,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.NO4,
      addresses: [ 0x04c324a4, 0x061a73a8 ],
    }],
  }, {
    name: 'Royal Cloak',
    type: TYPE.CLOAK,
    id: 222,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.RTOP,
      addresses: [ 0x057e0176 ],
    }],
  }, {
    name: 'Blood Cloak',
    type: TYPE.CLOAK,
    id: 223,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.RARE,
      addresses: [ 0x043c3136 ],
    }],
  }, {
    name: 'Joseph\'s Cloak',
    type: TYPE.CLOAK,
    id: 224,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.LIB,
      addresses: [ 0x047a31be ],
      shop: true,
    }],
  }, {
    name: 'Twilight Cloak',
    type: TYPE.CLOAK,
    id: 225,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.RDAI,
      addresses: [ 0x04e322d4 ],
    }],
  }, {
    name: 'Moonstone',
    type: TYPE.ACCESSORY,
    id: 227,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.NO4,
      addresses: [ 0x04c324c4, 0x061a73c8 ],
    }],
  }, {
    name: 'Sunstone',
    type: TYPE.ACCESSORY,
    id: 228,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.RNZ1,
      addresses: [ 0x059bc0e0 ],
    }],
  }, {
    name: 'Bloodstone',
    type: TYPE.ACCESSORY,
    id: 229,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.CAT,
      addresses: [ 0x044912f4 ],
    }],
  }, {
    name: 'Staurolite',
    type: TYPE.ACCESSORY,
    id: 230,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.RLIB,
      addresses: [ 0x04ee2f20 ],
    }],
  }, {
    name: 'Ring of Pales',
    type: TYPE.ACCESSORY,
    id: 231,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.LIB,
      addresses: [ 0x047a31ce ],
      shop: true,
    }],
  }, {
    name: 'Zircon',
    type: TYPE.ACCESSORY,
    id: 232,
    salable: true,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.DAI,
      addresses: [ 0x04676f12 ],
    }, {
      zone: ZONE.NO1,
      addresses: [ 0x049d3680 ],
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c324b2, 0x061a73b6 ],
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e0164 ],
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526c104 ],
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526c112 ],
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051ad7a0 ],
    }, {
      zone: ZONE.DAI,
      addresses: [ 0x04e322bc ],
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x05751556 ],
    }, {
      addresses: [ 0x000b5cac ],
      enemy: 6,
    }, {
      addresses: [ 0x000b5cfc ],
      enemy: 10,
    }, {
      addresses: [ 0x000b6ca4 ],
      enemy: 53,
    }],
  }, {
    name: 'Aquamarine',
    type: TYPE.ACCESSORY,
    id: 233,
    salable: true,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.DAI,
      addresses: [ 0x04676efe ],
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050f87c4 ],
    }, {
      zone: ZONE.RARE,
      addresses: [ 0x0575155c ],
    }, {
      addresses: [ 0x000b6ccc ],
      enemy: 52,
    }, {
      addresses: [ 0x000b9644 ],
      enemy: 91,
    }],
  }, {
    name: 'Turquoise',
    type: TYPE.ACCESSORY,
    id: 234,
    salable: true,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.TOP,
      addresses: [ 0x0560f5f8 ],
    }, {
      zone: ZONE.RLIB,
      addresses: [ 0x04ee2f10 ],
    }, {
      zone: ZONE.RNZ0,
      addresses: [ 0x0590307e ],
    }, {
      addresses: [ 0x000b7324 ],
      enemy: 116,
    }],
  }, {
    name: 'Onyx',
    type: TYPE.ACCESSORY,
    id: 235,
    salable: true,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.LIB,
      addresses: [ 0x047a3914 ],
    }, {
      zone: ZONE.NO4,
      addresses: [ 0x04c324cc, 0x061a73d0 ],
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa155e ],
    }],
  }, {
    name: 'Garnet',
    type: TYPE.ACCESSORY,
    id: 236,
    salable: true,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.NO1,
      addresses: [ 0x049d367a ],
    }, {
      zone: ZONE.NO2,
      addresses: [ 0x04aa169c ],
    }, {
      zone: ZONE.RTOP,
      addresses: [ 0x057e018c ],
    }, {
      zone: ZONE.RNO1,
      addresses: [ 0x0505017a ],
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526c0f0 ],
    }, {
      addresses: [ 0x000b632a ],
      enemy: 70,
    }],
  }, {
    name: 'Opal',
    type: TYPE.ACCESSORY,
    id: 237,
    salable: true,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.RLIB,
      addresses: [ 0x04ee2f12 ],
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526c0fe ],
    }, {
      zone: ZONE.RNO3,
      addresses: [ 0x051ad7a2 ],
    }, {
      zone: ZONE.RNO2,
      addresses: [ 0x050f87b8 ],
    }],
  }, {
    name: 'Diamond',
    type: TYPE.ACCESSORY,
    id: 238,
    salable: true,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.RNZ1,
      addresses: [ 0x059bc0dc ],
    }, {
      zone: ZONE.RNO4,
      addresses: [ 0x0526c102 ],
    }, {
      zone: ZONE.RCAT,
      addresses: [ 0x04cfb6fc ],
    }, {
      zone: ZONE.RDAI,
      addresses: [ 0x04e322ba ],
    }],
  }, {
    name: 'Lapis Lazuli',
    type: TYPE.ACCESSORY,
    id: 239,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      addresses: [ 0x000b70da ],
      enemy: 114,
    }],
  }, {
    name: 'Ring of Ares',
    type: TYPE.ACCESSORY,
    id: 240,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.CHI,
      addresses: [ 0x045e9604 ],
    }],
  }, {
    name: 'Ring of Varda',
    type: TYPE.ACCESSORY,
    id: 243,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      addresses: [ 0x000b7e2a ],
      enemy: 67,
    }],
  }, {
    name: 'Ring of Arcana',
    type: TYPE.ACCESSORY,
    id: 244,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.RNZ0,
      addresses: [ 0x05903080 ],
    }, {
      zone: ZONE.LIB,
      addresses: [ 0x047d92f0 ],
      byte: true,
      librarian: true,
    }],
  }, {
    name: 'Mystic Pendant',
    type: TYPE.ACCESSORY,
    id: 245,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.DAI,
      addresses: [ 0x04676f00 ],
    }, {
      addresses: [ 0x000b7872 ],
      enemy: 105,
    }],
  }, {
    name: 'Heart Broach',
    type: TYPE.ACCESSORY,
    id: 246,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      addresses: [ 0x000b6b14 ],
      enemy: 141,
    }],
  }, {
    name: 'Necklace of J',
    type: TYPE.ACCESSORY,
    id: 247,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.RCAT,
      addresses: [ 0x04cfb6fa ],
    }, {
      addresses: [ 0x000b7f1c ],
      enemy: 138,
    }],
  }, {
    name: 'Gauntlet',
    type: TYPE.ACCESSORY,
    id: 248,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.LIB,
      addresses: [ 0x047a31d6 ],
      shop: true,
    }, {
      addresses: [ 0x000b7e2c ],
      enemy: 67,
    }, {
      addresses: [ 0x000b8754 ],
      enemy: 96,
    }],
  }, {
    name: 'Ankh of Life',
    type: TYPE.ACCESSORY,
    id: 249,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.DAI,
      addresses: [ 0x04676ef8 ],
    }],
  }, {
    name: 'Ring of Feanor',
    type: TYPE.ACCESSORY,
    id: 250,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      addresses: [ 0x000b8a22 ],
      enemy: 87,
    }],
  }, {
    name: 'Medal',
    type: TYPE.ACCESSORY,
    id: 251,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.LIB,
      addresses: [ 0x047a31c6 ],
      shop: true,
    }, {
      addresses: [ 0x000b5b92 ],
      enemy: 62,
    }],
  }, {
    name: 'Talisman',
    type: TYPE.ACCESSORY,
    id: 252,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.RNO3,
      addresses: [ 0x051ad7aa ],
    }, {
      addresses: [ 0x000b6ac2 ],
      enemy: 26,
    }],
  }, {
    name: 'Duplicator',
    type: TYPE.ACCESSORY,
    id: 253,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.LIB,
      addresses: [ 0x047a31de ],
      shop: true,
    }],
  }, {
    name: 'King\'s Stone',
    type: TYPE.ACCESSORY,
    id: 254,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      addresses: [ 0x000b8ac2 ],
      enemy: 134,
    }],
  }, {
    name: 'Covenant Stone',
    type: TYPE.ACCESSORY,
    id: 255,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      addresses: [ 0x000b8034 ],
      enemy: 137,
    }],
  }, {
    name: 'Nauglamir',
    type: TYPE.ACCESSORY,
    id: 256,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      addresses: [ 0x000b73ea ],
      enemy: 122,
    }],
  }, {
    name: 'Secret Boots',
    type: TYPE.ACCESSORY,
    id: 257,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.NO4,
      addresses: [ 0x04c324de, 0x061a73e2 ],
    }],
  }, {
    name: 'Alucart Mail',
    type: TYPE.ARMOR,
    id: 258,
    blacklist: [ 0x000b6b3c, 0x000b6b3a ],
    tiles: [{
      zone: ZONE.NO0,
      addresses: [ 0x048fada4 ],
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
