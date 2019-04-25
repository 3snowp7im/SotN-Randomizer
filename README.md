# SotN Randomizer

This is a romhacking tool to randomize some things about `Castlevania:
Symphony of the Night`.

## Browser

https://3snowp7im.github.io/sotnrando/

## CLI

```shell
$ git clone https://github.com/3snowp7im/SotN-Randomizer
$ cd SotN-Randomizer
$ git submodule update --init
$ npm install
```

### Basic usage

To randomize your disc image, just pass in the path to your .bin file using the
`--bin` option. This will use the current time in seconds as the seed:

```shell
$ ./randomize -b sotn.bin
```

You can use a custom seed with the `--seed` option:

```shell
$ ./randomize -b sotn.bin -s myseed
```

### `--live`

If you plan on sharing a seed with outhers, the easiest way to use CLI is with
the `--live` option. To generate a random seed and print its url and starting
equipment:

```shell
$ ./randomize -lb sotn.bin
```

To use a custom seed and print its url and starting equipment:

```shell
$ ./randomize -lb sotn.bin -s myseed
```

To use a copied seed url and print its starting equipment:

```shell
$ ./randomize -lb sotn.bin https://sotn.io?449,myseed
```

### Dry run

You can also perform a number of actions without modifying a disc image.
To print any mismatches between your disc image and a vanilla image:

```shell
$ ./randomize -vcb sotn.bin
```

To print starting equipment and relic locations for a seed:

```shell
$ ./randomize -vvvs myseed
```
