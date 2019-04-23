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

If you plan on sharing a seed, the easiest way to use CLI is with the `--live`
option. To generate a random seed and print its url and starting equipment:

```shell
$ ./randomize sotn.bin -l
```

To specify a seed and print its url and starting equipment:

```shell
$ ./randomize sotn.bin -l -s myseed
```

To use a seed previously generated url and print its starting equipment:

```shell
$ ./randomize sotn.bin -l https://3snowp7im.github.io/sotnrando?s=myseed
```
