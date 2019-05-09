# SotN Randomizer

This is a romhacking tool to randomize some things about `Castlevania:
Symphony of the Night`.

## Browser

https://sotn.io

## CLI

```shell
$ git clone https://github.com/3snowp7im/SotN-Randomizer
$ cd SotN-Randomizer
$ git submodule update --init
$ npm install
```

### Usage

To randomize your disc image, just pass in the path to your .bin file using the
`--bin` option. This will use the current time as the seed:

```shell
$ ./randomize -b sotn.bin
```

You can print the seed used with the `--verbose` flag:

```shell
$ ./randomize -vb sotn.bin
```

The more `--verbose` flags you include, the more information about the
randomization gets printed:

```shell
$ ./randomize -vvvb sotn.bin
```

### Seed URLs

If you plan on sharing a seed with others, the easiest way to use CLI is with
the `--race` option and seed URLs. To use the current time as a seed and print
its URL and starting equipment:

```shell
$ ./randomize -rb sotn.bin
```

To use a custom seed and print its URL and starting equipment:

```shell
$ ./randomize -rb sotn.bin -s myseed
```

To use a copied seed URL and print its starting equipment:

```shell
$ ./randomize -rb sotn.bin https://sotn.io/?3b7,myseed
```

The `--race` option implies a verbosity level of 2. You can override this by
supplying your own `--verbose` flag(s):

```shell
$ ./randomize -vrb sotn.bin https://sotn.io/?3b7,myseed    # Less verbose
$ ./randomize -vvvrb sotn.bin https://sotn.io/?3b7,myseed  # More verbose
```

### `--check-vanilla`

The `--check-vanilla` option will check your disc image for any non-vanilla
values:

```shell
$ ./randomize -cvb sotn.bin
```

Note that `--check-vanilla` does not modify your disc image.

### Dry running

The `--check-vanilla` option is the only action that requires a bin file. You
can omit the `--bin` option from all other actions to perform a dry run.

To print starting equipment and relic locations for a URL without actually
writing the randomizations to your disc image:

```shell
$ ./randomize -vvvl https://sotn.io/?3b7,myseed
```
### Custom relic logic

Relic placement is determind by relic location locks. For more information:

```shell
$ ./randomize --help locks
```

Lock strings are a terse format of information meant solely for consumption
by the randomizer. Creating your own relic logic is more easily done using a
tool. Examples of such tools are `tools/agonize` and `tools/optimize`. These
scripts outline new rules for relic placement logic and output the
corresponding lock string. The resulting lock string can then be used as part
of the randomizer options:

```shell
$ ./randomize -uo r$(tools/agonize)   # Create a URL for a slow seed
$ ./randomize -uo r$(tools/optimize)  # Create a URL for a fast seed
```
