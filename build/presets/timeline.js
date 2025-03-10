// This is a generated file. Do not edit it directly.
// Make your changes to presets/timeline.json then rebuild
// this file with `npm run build-presets -- timeline`.
(function(self) {

  // Boilerplate.
  let util
  if (self) {
    util = self.sotnRando.util
  } else {
    util = require('../../src/util')
  }
  const PresetBuilder = util.PresetBuilder

  // Create PresetBuilder.
  const builder = PresetBuilder.fromJSON({"metadata":{"id":"timeline","name":"Timeline","description":"Random relics are given at regular intervals through the course of the seed.","author":["MottZilla"],"weight":-5000,"knowledgeCheck":"None","metaExtension":"Guarded","metaComplexity":"8","itemStats":"Normal","timeFrame":"Normal","moddedLevel":"Slightly","castleType":"Normal","transformEarly":"No","transformFocus":"No","winCondition":"Normal"},"comment":"Prototype","inherits":"casual","colorrandoMode":true,"stats":false,"turkeyMode":true,"music":false,"fastwarpMode":true,"magicmaxMode":true,"complexityGoal":{"min":8,"comment":"Get all Vlads + Glasses","goals":["Holy glasses + Heart of Vlad + Tooth of Vlad + Rib of Vlad + Ring of Vlad + Eye of Vlad"]},"writes":[{"comment":"Dont consume mana transforming into mist","type":"short","address":"0x00118b34","value":"0x0000"},{"comment":"Don't consume mana in mist form","type":"short","address":"0x00118ae8","value":"0x0000"},{"comment":"Don't consume mana in wolf form","type":"short","address":"0x00118cc8","value":"0x0000"},{"comment":"Reduce mana consumption during wolf dash","type":"char","address":"0x000b53b0","value":"0x01"},{"comment":"EX0","type":"word","address":"0x370F5A8","value":"0x080030A1"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x03020100"},{"type":"word","value":"0x07060504"},{"type":"word","value":"0x0B0A0908"},{"type":"word","value":"0x0F0E0D0C"},{"type":"word","value":"0x13121110"},{"type":"word","value":"0x17161514"},{"type":"word","value":"0x1B1A1918"},{"type":"word","value":"0x00001D1C"},{"type":"word","value":"0x4C554F33"},{"type":"word","value":"0x00462F00"},{"type":"word","value":"0xFF544122"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x45524926"},{"type":"word","value":"0x00462F00"},{"type":"word","value":"0xFF544122"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x4F484325"},{"type":"word","value":"0x00462F00"},{"type":"word","value":"0xFF544122"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x43524F26"},{"type":"word","value":"0x462F0045"},{"type":"word","value":"0x48432500"},{"type":"word","value":"0x0000FF4F"},{"type":"word","value":"0x4C554F33"},{"type":"word","value":"0x00462F00"},{"type":"word","value":"0x464C4F37"},{"type":"word","value":"0x000000FF"},{"type":"word","value":"0x45574F30"},{"type":"word","value":"0x462F0052"},{"type":"word","value":"0x4C4F3700"},{"type":"word","value":"0x0000FF46"},{"type":"word","value":"0x4C494B33"},{"type":"word","value":"0x462F004C"},{"type":"word","value":"0x4C4F3700"},{"type":"word","value":"0x0000FF46"},{"type":"word","value":"0x4D524F26"},{"type":"word","value":"0x00462F00"},{"type":"word","value":"0x5453492D"},{"type":"word","value":"0x000000FF"},{"type":"word","value":"0x45574F30"},{"type":"word","value":"0x462F0052"},{"type":"word","value":"0x53492D00"},{"type":"word","value":"0x0000FF54"},{"type":"word","value":"0x00534127"},{"type":"word","value":"0x554F4C23"},{"type":"word","value":"0x0000FF44"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x45425523"},{"type":"word","value":"0x00462F00"},{"type":"word","value":"0xFF454F3A"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x52495033"},{"type":"word","value":"0x2F005449"},{"type":"word","value":"0x00FF4252"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x56415227"},{"type":"word","value":"0x00595449"},{"type":"word","value":"0x544F4F22"},{"type":"word","value":"0x0000FF53"},{"type":"word","value":"0x5041452C"},{"type":"word","value":"0x4F543300"},{"type":"word","value":"0x00FF454E"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x594C4F28"},{"type":"word","value":"0x4D593300"},{"type":"word","value":"0xFF4C4F42"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x52454126"},{"type":"word","value":"0x33004549"},{"type":"word","value":"0x4C4F5243"},{"type":"word","value":"0x0000FF4C"},{"type":"word","value":"0x4557452A"},{"type":"word","value":"0x462F004C"},{"type":"word","value":"0x45502F00"},{"type":"word","value":"0x0000FF4E"},{"type":"word","value":"0x4D52452D"},{"type":"word","value":"0x33004E41"},{"type":"word","value":"0x55544154"},{"type":"word","value":"0x0000FF45"},{"type":"word","value":"0x00544122"},{"type":"word","value":"0x44524123"},{"type":"word","value":"0x000000FF"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x534F4827"},{"type":"word","value":"0x41230054"},{"type":"word","value":"0x00FF4452"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x52454126"},{"type":"word","value":"0x23004549"},{"type":"word","value":"0xFF445241"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x4F4D4524"},{"type":"word","value":"0x4123004E"},{"type":"word","value":"0x00FF4452"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x524F5733"},{"type":"word","value":"0x41230044"},{"type":"word","value":"0x00FF4452"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x49525033"},{"type":"word","value":"0x23004554"},{"type":"word","value":"0xFF445241"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x45534F2E"},{"type":"word","value":"0x49564544"},{"type":"word","value":"0x4123004C"},{"type":"word","value":"0x00FF4452"},{"type":"word","value":"0x52414528"},{"type":"word","value":"0x462F0054"},{"type":"word","value":"0x414C3600"},{"type":"word","value":"0x0000FF44"},{"type":"word","value":"0x544F4F34"},{"type":"word","value":"0x462F0048"},{"type":"word","value":"0x414C3600"},{"type":"word","value":"0x0000FF44"},{"type":"word","value":"0x00424932"},{"type":"word","value":"0x3600462F"},{"type":"word","value":"0xFF44414C"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x474E4932"},{"type":"word","value":"0x00462F00"},{"type":"word","value":"0x44414C36"},{"type":"word","value":"0x000000FF"},{"type":"word","value":"0x00455925"},{"type":"word","value":"0x3600462F"},{"type":"word","value":"0xFF44414C"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x5242492C"},{"type":"word","value":"0x00595241"},{"type":"word","value":"0x44524123"},{"type":"word","value":"0x000000FF"},{"type":"word","value":"0x4F525225"},{"type":"word","value":"0x0000FF52"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x444C4F27"},{"type":"word","value":"0x4E493200"},{"type":"word","value":"0x0000FF47"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x564C4933"},{"type":"word","value":"0x32005245"},{"type":"word","value":"0xFF474E49"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x4B495033"},{"type":"word","value":"0x45524245"},{"type":"word","value":"0x52454B41"},{"type":"word","value":"0x000000FF"},{"type":"word","value":"0x594C4F28"},{"type":"word","value":"0x53414C47"},{"type":"word","value":"0xFF534553"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x27BDFFE0"},{"type":"word","value":"0xAFBF0018"},{"type":"word","value":"0xAFA80014"},{"type":"word","value":"0xAFA90010"},{"type":"word","value":"0x3C048007"},{"type":"word","value":"0x8C8430B0"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x14800012"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x3C048009"},{"type":"word","value":"0x8C8474A0"},{"type":"word","value":"0x34050041"},{"type":"word","value":"0x1485000D"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x3C048000"},{"type":"word","value":"0x3484C008"},{"type":"word","value":"0xAC800000"},{"type":"word","value":"0xAC800004"},{"type":"word","value":"0xAC800008"},{"type":"word","value":"0xAC80000C"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x34050001"},{"type":"word","value":"0x3C048007"},{"type":"word","value":"0x348430B0"},{"type":"word","value":"0xAC850000"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x0C00316E"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x3C048000"},{"type":"word","value":"0x3484C00C"},{"type":"word","value":"0x3C098000"},{"type":"word","value":"0x3529C280"},{"type":"word","value":"0x34080001"},{"type":"word","value":"0xAD280000"},{"type":"word","value":"0x8C850008"},{"type":"word","value":"0x8C860004"},{"type":"word","value":"0x14A0007F"},{"type":"word","value":"0x34070002"},{"type":"word","value":"0x10C70005"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x14C0007B"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x34080000"},{"type":"word","value":"0xAD280000"},{"type":"word","value":"0x8C85FFFC"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x14A00075"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x8C850000"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x30A50001"},{"type":"word","value":"0x10A00070"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x3C078000"},{"type":"word","value":"0x34E7C020"},{"type":"word","value":"0x8C860000"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x00063042"},{"type":"word","value":"0x00E63821"},{"type":"word","value":"0x90E40000"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x34850000"},{"type":"word","value":"0x24A5FFE2"},{"type":"word","value":"0x04A00002"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x24840002"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x34850000"},{"type":"word","value":"0x30A50020"},{"type":"word","value":"0x14A00016"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x3C078009"},{"type":"word","value":"0x34E77964"},{"type":"word","value":"0x00E43821"},{"type":"word","value":"0x15000002"},{"type":"word","value":"0x34060003"},{"type":"word","value":"0xA0E60000"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x3C058000"},{"type":"word","value":"0x34A5C040"},{"type":"word","value":"0x24840001"},{"type":"word","value":"0x24A5FFF0"},{"type":"word","value":"0x24A50010"},{"type":"word","value":"0x2484FFFF"},{"type":"word","value":"0x1480FFFD"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x34A40000"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x0C003150"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x08003145"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x34050020"},{"type":"word","value":"0x1085000F"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x34050021"},{"type":"word","value":"0x10850017"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x34050022"},{"type":"word","value":"0x1085001F"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x34050023"},{"type":"word","value":"0x10850027"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x34050024"},{"type":"word","value":"0x1085002F"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x08003145"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x15000004"},{"type":"word","value":"0x34040048"},{"type":"word","value":"0x34050001"},{"type":"word","value":"0x0C03F61D"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x3C048000"},{"type":"word","value":"0x3484C240"},{"type":"word","value":"0x0C003150"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x08003145"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x15000004"},{"type":"word","value":"0x34040049"},{"type":"word","value":"0x34050001"},{"type":"word","value":"0x0C03F61D"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x3C048000"},{"type":"word","value":"0x3484C250"},{"type":"word","value":"0x0C003150"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x08003145"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x15000004"},{"type":"word","value":"0x3404000E"},{"type":"word","value":"0x34050001"},{"type":"word","value":"0x0C03F61D"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x3C048000"},{"type":"word","value":"0x3484C260"},{"type":"word","value":"0x0C003150"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x08003145"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x15000004"},{"type":"word","value":"0x34040022"},{"type":"word","value":"0x34050001"},{"type":"word","value":"0x0C03F61D"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x3C048000"},{"type":"word","value":"0x3484C270"},{"type":"word","value":"0x0C003150"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x08003145"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x15000004"},{"type":"word","value":"0x340400A6"},{"type":"word","value":"0x34050000"},{"type":"word","value":"0x0C03F61D"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x3C048000"},{"type":"word","value":"0x3484C220"},{"type":"word","value":"0x0C003150"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x08003145"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x0C003191"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x8FA90010"},{"type":"word","value":"0x8FA80014"},{"type":"word","value":"0x8FBF0018"},{"type":"word","value":"0x27BD0020"},{"type":"word","value":"0x3C028004"},{"type":"word","value":"0x8C42C9A0"},{"type":"word","value":"0x03E00008"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x27BDFFE0"},{"type":"word","value":"0xAFBF0018"},{"type":"word","value":"0xAFA40014"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x3C048009"},{"type":"word","value":"0x8C847410"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x10800008"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x3C048009"},{"type":"word","value":"0x8C847414"},{"type":"word","value":"0x3C028004"},{"type":"word","value":"0x8C42C7B4"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x0040F809"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x8FA40014"},{"type":"word","value":"0x34050001"},{"type":"word","value":"0x0C003204"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x3C098001"},{"type":"word","value":"0x8D29C280"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x15200003"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x0C04D1FE"},{"type":"word","value":"0x3404067C"},{"type":"word","value":"0x8FBF0018"},{"type":"word","value":"0x03E00008"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x3C048000"},{"type":"word","value":"0x3484C008"},{"type":"word","value":"0x8C85000C"},{"type":"word","value":"0x3406003C"},{"type":"word","value":"0x24A50001"},{"type":"word","value":"0xAC85000C"},{"type":"word","value":"0x14A60014"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0xAC80000C"},{"type":"word","value":"0x8C850008"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x24A50001"},{"type":"word","value":"0xAC850008"},{"type":"word","value":"0x14A6000D"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0xAC800008"},{"type":"word","value":"0x8C850004"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x24A50001"},{"type":"word","value":"0xAC850004"},{"type":"word","value":"0x14A60006"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0xAC800004"},{"type":"word","value":"0x8C850000"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x24A50001"},{"type":"word","value":"0xAC850000"},{"type":"word","value":"0x03E00008"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x27BDFFE0"},{"type":"word","value":"0xAFBF0004"},{"type":"word","value":"0x3C068000"},{"type":"word","value":"0x34C6C62C"},{"type":"word","value":"0x3C078009"},{"type":"word","value":"0x8CC40000"},{"type":"word","value":"0x34E77490"},{"type":"word","value":"0x94E50000"},{"type":"word","value":"0x10800007"},{"type":"word","value":"0x30A5A000"},{"type":"word","value":"0x14A00039"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x0C0031DA"},{"type":"word","value":"0x34040000"},{"type":"word","value":"0x080031D5"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x94E40004"},{"type":"word","value":"0x94E20004"},{"type":"word","value":"0x3C068000"},{"type":"word","value":"0x34C6C634"},{"type":"word","value":"0x30848000"},{"type":"word","value":"0x10800005"},{"type":"word","value":"0x8CC50000"},{"type":"word","value":"0x34040010"},{"type":"word","value":"0x24A50001"},{"type":"word","value":"0xACC50000"},{"type":"word","value":"0xACC40004"},{"type":"word","value":"0x30422000"},{"type":"word","value":"0x10400006"},{"type":"word","value":"0x8CC50008"},{"type":"word","value":"0x34040010"},{"type":"word","value":"0x24A50001"},{"type":"word","value":"0xACC50008"},{"type":"word","value":"0x34050010"},{"type":"word","value":"0xACC4000C"},{"type":"word","value":"0x8CC50004"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x10A00005"},{"type":"word","value":"0x24A5FFFF"},{"type":"word","value":"0xACC50004"},{"type":"word","value":"0x14A00002"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0xACC00000"},{"type":"word","value":"0x8CC5000C"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x10A00005"},{"type":"word","value":"0x24A5FFFF"},{"type":"word","value":"0xACC5000C"},{"type":"word","value":"0x14A00002"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0xACC00008"},{"type":"word","value":"0x8CC50000"},{"type":"word","value":"0x8CC20008"},{"type":"word","value":"0x34070002"},{"type":"word","value":"0x10A70004"},{"type":"word","value":"0x10470003"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x080031D5"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0xACC00000"},{"type":"word","value":"0xACC00004"},{"type":"word","value":"0xACC00008"},{"type":"word","value":"0xACC0000C"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x0C0031DA"},{"type":"word","value":"0x34040001"},{"type":"word","value":"0x080031D5"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x8FBF0004"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x27BD0020"},{"type":"word","value":"0x03E00008"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x3C068000"},{"type":"word","value":"0x34C6C62C"},{"type":"word","value":"0xACC40000"},{"type":"word","value":"0x10800008"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x34050002"},{"type":"word","value":"0x34044000"},{"type":"word","value":"0x3408C000"},{"type":"word","value":"0x3407FFFD"},{"type":"word","value":"0x34020002"},{"type":"word","value":"0x080031EB"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x34050001"},{"type":"word","value":"0x34048000"},{"type":"word","value":"0x34084000"},{"type":"word","value":"0x3407FFFE"},{"type":"word","value":"0x34020003"},{"type":"word","value":"0x3C068011"},{"type":"word","value":"0xA4C52B7C"},{"type":"word","value":"0xA4C42B84"},{"type":"word","value":"0xA4C52D8C"},{"type":"word","value":"0xA4C42D94"},{"type":"word","value":"0xA4C52CDC"},{"type":"word","value":"0xA4C42CE4"},{"type":"word","value":"0xA4C52F84"},{"type":"word","value":"0xA4C42F88"},{"type":"word","value":"0xA4C82F68"},{"type":"word","value":"0xA4C72F64"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x3C06800A"},{"type":"word","value":"0x34C6E000"},{"type":"word","value":"0xA4C20488"},{"type":"word","value":"0xA4C20490"},{"type":"word","value":"0xA4C20498"},{"type":"word","value":"0xA4C204A0"},{"type":"word","value":"0xA4C204A8"},{"type":"word","value":"0xA4C204B0"},{"type":"word","value":"0xA4C204B8"},{"type":"word","value":"0xA4C204C0"},{"type":"word","value":"0x03E00008"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x27BDFFA0"},{"type":"word","value":"0xAFB10054"},{"type":"word","value":"0x34B10000"},{"type":"word","value":"0x27A50010"},{"type":"word","value":"0xAFB00050"},{"type":"word","value":"0x34100000"},{"type":"word","value":"0x340D0000"},{"type":"word","value":"0x3402003F"},{"type":"word","value":"0xAFBF0058"},{"type":"word","value":"0xA0A00000"},{"type":"word","value":"0x2442FFFF"},{"type":"word","value":"0x0441FFFD"},{"type":"word","value":"0x24A50001"},{"type":"word","value":"0x27A50010"},{"type":"word","value":"0x340200FF"},{"type":"word","value":"0x90830000"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x14620005"},{"type":"word","value":"0x24840001"},{"type":"word","value":"0x90830000"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x10600009"},{"type":"word","value":"0x24840001"},{"type":"word","value":"0xA0A30000"},{"type":"word","value":"0x10600004"},{"type":"word","value":"0x24A50001"},{"type":"word","value":"0x25AD0001"},{"type":"word","value":"0x08003213"},{"type":"word","value":"0x26100008"},{"type":"word","value":"0x08003213"},{"type":"word","value":"0x26100004"},{"type":"word","value":"0x31A5FFFF"},{"type":"word","value":"0x34040006"},{"type":"word","value":"0x3C028004"},{"type":"word","value":"0x8C42C7B8"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x0040F809"},{"type":"word","value":"0x24A50004"},{"type":"word","value":"0x00021400"},{"type":"word","value":"0x00021C03"},{"type":"word","value":"0x2402FFFF"},{"type":"word","value":"0x3C018009"},{"type":"word","value":"0xAC237414"},{"type":"word","value":"0x10620099"},{"type":"word","value":"0x00031040"},{"type":"word","value":"0x00431021"},{"type":"word","value":"0x00021080"},{"type":"word","value":"0x00431021"},{"type":"word","value":"0x00021080"},{"type":"word","value":"0x3C038008"},{"type":"word","value":"0x34636FEC"},{"type":"word","value":"0x00436021"},{"type":"word","value":"0x34020003"},{"type":"word","value":"0xA1820007"},{"type":"word","value":"0x322200FF"},{"type":"word","value":"0xA1800028"},{"type":"word","value":"0xA180001C"},{"type":"word","value":"0xA1800010"},{"type":"word","value":"0xA1800004"},{"type":"word","value":"0xA1800029"},{"type":"word","value":"0xA180001D"},{"type":"word","value":"0xA1800011"},{"type":"word","value":"0xA1800005"},{"type":"word","value":"0xA180002A"},{"type":"word","value":"0xA180001E"},{"type":"word","value":"0xA1800012"},{"type":"word","value":"0x10400005"},{"type":"word","value":"0xA1800006"},{"type":"word","value":"0x340200AF"},{"type":"word","value":"0xA1820012"},{"type":"word","value":"0x0800324F"},{"type":"word","value":"0xA1820006"},{"type":"word","value":"0x3402005F"},{"type":"word","value":"0xA1820011"},{"type":"word","value":"0xA1820005"},{"type":"word","value":"0x322200FF"},{"type":"word","value":"0x10400003"},{"type":"word","value":"0x340D0007"},{"type":"word","value":"0x08003256"},{"type":"word","value":"0x26100004"},{"type":"word","value":"0x340200D4"},{"type":"word","value":"0x00506823"},{"type":"word","value":"0x01B01821"},{"type":"word","value":"0x24620020"},{"type":"word","value":"0x25AA000A"},{"type":"word","value":"0x246B0018"},{"type":"word","value":"0xA582002C"},{"type":"word","value":"0xA5820014"},{"type":"word","value":"0x340200D0"},{"type":"word","value":"0xA5820016"},{"type":"word","value":"0xA582000A"},{"type":"word","value":"0x340200DF"},{"type":"word","value":"0xA582002E"},{"type":"word","value":"0xA5820022"},{"type":"word","value":"0x340201EE"},{"type":"word","value":"0xA5820026"},{"type":"word","value":"0x34020011"},{"type":"word","value":"0x3405001F"},{"type":"word","value":"0x34040197"},{"type":"word","value":"0xA5820032"},{"type":"word","value":"0x25A2FFFA"},{"type":"word","value":"0x340900CB"},{"type":"word","value":"0x34080010"},{"type":"word","value":"0x34060018"},{"type":"word","value":"0x340701EF"},{"type":"word","value":"0xA58D0020"},{"type":"word","value":"0xA58D0008"},{"type":"word","value":"0x25AD0010"},{"type":"word","value":"0x8D8C0000"},{"type":"word","value":"0x24630016"},{"type":"word","value":"0xA5820008"},{"type":"word","value":"0x34020080"},{"type":"word","value":"0xA585001A"},{"type":"word","value":"0xA584000E"},{"type":"word","value":"0xA589000A"},{"type":"word","value":"0xA182000C"},{"type":"word","value":"0xA180000D"},{"type":"word","value":"0xA1880018"},{"type":"word","value":"0xA1860019"},{"type":"word","value":"0xA5870026"},{"type":"word","value":"0xA5800032"},{"type":"word","value":"0x8D8C0000"},{"type":"word","value":"0x340200A8"},{"type":"word","value":"0xA585001A"},{"type":"word","value":"0xA584000E"},{"type":"word","value":"0xA5830008"},{"type":"word","value":"0xA589000A"},{"type":"word","value":"0xA182000C"},{"type":"word","value":"0xA180000D"},{"type":"word","value":"0xA1880018"},{"type":"word","value":"0xA1860019"},{"type":"word","value":"0xA5870026"},{"type":"word","value":"0xA5800032"},{"type":"word","value":"0x8D8C0000"},{"type":"word","value":"0x34020004"},{"type":"word","value":"0xA1820007"},{"type":"word","value":"0x340200CD"},{"type":"word","value":"0xA5820016"},{"type":"word","value":"0xA582000A"},{"type":"word","value":"0x340200E1"},{"type":"word","value":"0xA582002E"},{"type":"word","value":"0xA5820022"},{"type":"word","value":"0x34020098"},{"type":"word","value":"0xA1820024"},{"type":"word","value":"0xA182000C"},{"type":"word","value":"0x3402009C"},{"type":"word","value":"0xA1820030"},{"type":"word","value":"0xA1820018"},{"type":"word","value":"0x34020002"},{"type":"word","value":"0xA1820019"},{"type":"word","value":"0xA182000D"},{"type":"word","value":"0x34020016"},{"type":"word","value":"0xA585001A"},{"type":"word","value":"0xA584000E"},{"type":"word","value":"0xA58A0020"},{"type":"word","value":"0xA58A0008"},{"type":"word","value":"0xA58B002C"},{"type":"word","value":"0xA58B0014"},{"type":"word","value":"0xA1820031"},{"type":"word","value":"0xA1820025"},{"type":"word","value":"0xA5870026"},{"type":"word","value":"0xA5800032"},{"type":"word","value":"0x8D8C0000"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x1180001D"},{"type":"word","value":"0x27A50010"},{"type":"word","value":"0x3409001E"},{"type":"word","value":"0x34080196"},{"type":"word","value":"0x34040008"},{"type":"word","value":"0x340701F0"},{"type":"word","value":"0x340600D4"},{"type":"word","value":"0x90A30000"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x10600012"},{"type":"word","value":"0x24A50001"},{"type":"word","value":"0xA58D0008"},{"type":"word","value":"0x3062000F"},{"type":"word","value":"0x000210C0"},{"type":"word","value":"0xA182000C"},{"type":"word","value":"0x306200F0"},{"type":"word","value":"0x00021042"},{"type":"word","value":"0xA589001A"},{"type":"word","value":"0xA588000E"},{"type":"word","value":"0xA182000D"},{"type":"word","value":"0xA1840019"},{"type":"word","value":"0xA1840018"},{"type":"word","value":"0xA5870026"},{"type":"word","value":"0xA5800032"},{"type":"word","value":"0xA586000A"},{"type":"word","value":"0x8D8C0000"},{"type":"word","value":"0x080032C5"},{"type":"word","value":"0x25AD0008"},{"type":"word","value":"0x25AD0004"},{"type":"word","value":"0x1580FFE9"},{"type":"word","value":"0x34020130"},{"type":"word","value":"0x3C018009"},{"type":"word","value":"0xAC227410"},{"type":"word","value":"0x8FBF0058"},{"type":"word","value":"0x8FB10054"},{"type":"word","value":"0x8FB00050"},{"type":"word","value":"0x27BD0060"},{"type":"word","value":"0x03E00008"},{"comment":"End of EX0","type":"word","value":"0x00000000"},{"comment":"SectLd","type":"word","address":"0xFE824","value":"0x27BDFFE0"},{"type":"word","value":"0x3C020022"},{"type":"word","value":"0x34422905"},{"type":"word","value":"0x34040002"},{"type":"word","value":"0x27A50010"},{"type":"word","value":"0x34060000"},{"type":"word","value":"0xAFBF0018"},{"type":"word","value":"0x0C006578"},{"type":"word","value":"0xAFA20010"},{"type":"word","value":"0x34040004"},{"type":"word","value":"0x3C058000"},{"type":"word","value":"0x34A5C000"},{"type":"word","value":"0x3C018001"},{"type":"word","value":"0x3421C080"},{"type":"word","value":"0x0020F809"},{"type":"word","value":"0x34060080"},{"type":"word","value":"0x34040000"},{"type":"word","value":"0x3C018001"},{"type":"word","value":"0x3421C188"},{"type":"word","value":"0x0020F809"},{"type":"word","value":"0x34050000"},{"type":"word","value":"0x3C04800E"},{"type":"word","value":"0x3484459C"},{"type":"word","value":"0x3C050C03"},{"type":"word","value":"0x34A5913B"},{"type":"word","value":"0xAC850000"},{"type":"word","value":"0x34020000"},{"type":"word","value":"0x8FBF0018"},{"type":"word","value":"0x27BD0020"},{"type":"word","value":"0x03E00008"},{"comment":"End of Sect Load","type":"word","value":"0x00000000"},{"comment":"FrameHook","type":"word","address":"0x10B138","value":"0x0C003000"},{"type":"word","value":"0x00000000"},{"comment":"SectHK","type":"word","address":"0xFA244","value":"0x0C03A07F"},{"comment":"Relic Orbs Always Appear ARE","type":"word","address":"0x4409CD0","value":"0x34020000"},{"comment":"Relic Orbs Always Appear CAT","type":"word","address":"0x44DD53C","value":"0x34020000"},{"comment":"Relic Orbs Always Appear CEN","type":"word","address":"0x4576528","value":"0x34020000"},{"comment":"Relic Orbs Always Appear CHI","type":"word","address":"0x4611F20","value":"0x34020000"},{"comment":"Relic Orbs Always Appear DAI","type":"word","address":"0x46CD484","value":"0x34020000"},{"comment":"Relic Orbs Always Appear LIB","type":"word","address":"0x47F3AB4","value":"0x34020000"},{"comment":"Relic Orbs Always Appear NO0","type":"word","address":"0x494EF54","value":"0x34020000"},{"comment":"Relic Orbs Always Appear NO1","type":"word","address":"0x4A22EDC","value":"0x34020000"},{"comment":"Relic Orbs Always Appear NO2","type":"word","address":"0x4AE8130","value":"0x34020000"},{"comment":"Relic Orbs Always Appear NO3","type":"word","address":"0x4BB8978","value":"0x34020000"},{"comment":"Relic Orbs Always Appear NO4","type":"word","address":"0x4C8CD4C","value":"0x34020000"},{"comment":"Relic Orbs Always Appear NP3","type":"word","address":"0x543CED8","value":"0x34020000"},{"comment":"Relic Orbs Always Appear NZ0","type":"word","address":"0x54F9870","value":"0x34020000"},{"comment":"Relic Orbs Always Appear NZ1","type":"word","address":"0x55AC520","value":"0x34020000"},{"comment":"Relic Orbs Always Appear RARE","type":"word","address":"0x578404C","value":"0x34020000"},{"comment":"Relic Orbs Always Appear RCAT","type":"word","address":"0x4D3CB3C","value":"0x34020000"},{"comment":"Relic Orbs Always Appear RCHI","type":"word","address":"0x4DCA400","value":"0x34020000"},{"comment":"Relic Orbs Always Appear RDAI","type":"word","address":"0x4E745B8","value":"0x34020000"},{"comment":"Relic Orbs Always Appear RNO1","type":"word","address":"0x5085658","value":"0x34020000"},{"comment":"Relic Orbs Always Appear RNO2","type":"word","address":"0x513D75C","value":"0x34020000"},{"comment":"Relic Orbs Always Appear RNO4","type":"word","address":"0x52C69C0","value":"0x34020000"},{"comment":"Relic Orbs Always Appear RNZ0","type":"word","address":"0x593C7E0","value":"0x34020000"},{"comment":"Relic Orbs Always Appear RNZ1","type":"word","address":"0x59F5A0C","value":"0x34020000"},{"comment":"Relic Orbs Always Appear TOP","type":"word","address":"0x564987C","value":"0x34020000"},{"comment":"Relic Orbs Always Appear RBO7","type":"word","address":"0x69F1860","value":"0x34020000"},{"comment":"Relic Orbs Always Appear RBO4","type":"word","address":"0x67F37E8","value":"0x34020000"},{"comment":"Relic Orbs Always Appear RBO3","type":"word","address":"0x675F114","value":"0x34020000"},{"comment":"Relic Orbs Always Appear RBO2","type":"word","address":"0x664E5EC","value":"0x34020000"},{"comment":"Relic Orbs Always Appear RBO0","type":"word","address":"0x64953D0","value":"0x34020000"},{"comment":"create the reference table","type":"char","address":"0x370F5C8","value":"randomHexChar<0x00-0x22>"},{"type":"char","value":"randomHexChar<0x00-0x22>"},{"type":"char","value":"randomHexChar<0x00-0x22>"},{"type":"char","value":"randomHexChar<0x00-0x22>"},{"type":"char","value":"randomHexChar<0x00-0x22>"},{"type":"char","value":"randomHexChar<0x00-0x22>"},{"type":"char","value":"randomHexChar<0x00-0x22>"},{"type":"char","value":"randomHexChar<0x00-0x22>"},{"type":"char","value":"randomHexChar<0x00-0x22>"},{"type":"char","value":"randomHexChar<0x00-0x22>"},{"type":"char","value":"randomHexChar<0x00-0x22>"},{"type":"char","value":"randomHexChar<0x00-0x22>"},{"type":"char","value":"randomHexChar<0x00-0x22>"},{"type":"char","value":"randomHexChar<0x00-0x22>"},{"type":"char","value":"randomHexChar<0x00-0x22>"},{"type":"char","value":"randomHexChar<0x00-0x22>"},{"type":"char","value":"randomHexChar<0x00-0x22>"},{"type":"char","value":"randomHexChar<0x00-0x22>"},{"type":"char","value":"randomHexChar<0x00-0x22>"},{"type":"char","value":"randomHexChar<0x00-0x22>"},{"type":"char","value":"randomHexChar<0x00-0x22>"},{"type":"char","value":"randomHexChar<0x00-0x22>"},{"type":"char","value":"randomHexChar<0x00-0x22>"},{"type":"char","value":"randomHexChar<0x00-0x22>"},{"type":"char","value":"randomHexChar<0x00-0x22>"},{"type":"char","value":"randomHexChar<0x00-0x22>"},{"type":"char","value":"randomHexChar<0x00-0x22>"},{"type":"char","value":"randomHexChar<0x00-0x22>"},{"type":"char","value":"randomHexChar<0x00-0x22>"},{"type":"char","value":"randomHexChar<0x00-0x22>"},{"type":"char","value":"0x00>"},{"type":"char","value":"0x00"}]})

  // Export.
  const preset = builder.build()

  if (self) {
    const presets = (self.sotnRando || {}).presets || []
    presets.push(preset)
    self.sotnRando = Object.assign(self.sotnRando || {}, {
      presets: presets,
    })
  } else if (!module.parent) {
    console.log(preset.toString())
  } else {
    module.exports = preset
  }
})(typeof(self) !== 'undefined' ? self : null)
