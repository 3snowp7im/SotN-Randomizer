# SotN Randomizer

This is a romhacking tool to randomize some things about `Castlevania:
Symphony of the Night`.

## Browser

https://sotn.io

## CLI

```shell
$ git clone https://github.com/3snowp7im/SotN-Randomizer
$ cd SotN-Randomizer
$ npm install
```

### Usage

To randomize your disc image, just pass in the path to your .bin file using the
`--bin` option. This will use the current time as the seed:

```shell
$ node randomize -b sotn.bin
```

You can print the seed used with the `--verbose` flag:

```shell
$ node randomize -vb sotn.bin
```

The more `--verbose` flags you include, the more information about the
randomization gets printed:

```shell
$ node randomize -vvvb sotn.bin
```

### Seed URLs

If you plan on sharing a seed with others, the easiest way to use CLI is with
the `--race` option and seed URLs. To use the current time as a seed and print
its URL and starting equipment:

```shell
$ node randomize -rb sotn.bin
```

To use a custom seed and print its URL and starting equipment:

```shell
$ node randomize -rb sotn.bin -s myseed
```

To use a copied seed URL and print its starting equipment:

```shell
$ node randomize -rb sotn.bin https://sotn.io/?myseed
```

The `--race` option implies a verbosity level of 2. You can override this by
supplying your own `--verbose` flag(s):

```shell
$ node randomize -vrb sotn.bin https://sotn.io/?myseed    # Less verbose
$ node randomize -vvvrb sotn.bin https://sotn.io/?myseed  # More verbose
```

### Dry running

You can omit the `--bin` option to perform a dry run.

To print starting equipment and relic locations for a URL without actually
writing the randomizations to your disc image:

```shell
$ node randomize -vvvr https://sotn.io/?myseed
```

### Presets

Presets are scripts that generate different randomizations from those found in
the default mode. When run, preset scripts output an options string that can
be used with the `randomize` utility. To create your own preset, save a copy of
`presets/sample.js` and modify its contents with your own customizations.

For example, you have created your preset and named it `presets/mypreset.js`.
To create a URL that allows others to randomize their game using your
customizations:

```shell
$ node randomize -uo $(node presets/mypreset)
```
## Console

Randomized disc images can be played on all consoles that run game backups.
This includes hardmodded PlayStations and softmodded PS2s. The latter approach
is more accessible and will be outlined in this section.

### Hardware needed

##### PS2 console compatible with FreeMcBoot
Check the compatibility list [here](https://www.ps2-home.com/forum/app.php/page/fmcb-compatible-ps2-models-chart).

##### PS2 memcard with FreeMcBoot and uLaunchELF
You can find these on Amazon or make one yourself.

##### USB thumb drive
This will store your randomized disc image.

### Software needed

##### POPStarter r13 WIP 06 Beta 17
Download from [here](https://www.ps2-home.com/forum/viewtopic.php?p=13938#p13938).
*Note:* This version is known to cause random crashes on some PS2 revisions.
Unfortunately, other recent POPStarter versions do not load the castle map
corretly. Your mileage may vary.

##### `POPS_IOX.PAK`
You will need to locate this yourself. MD5: `a625d0b3036823cdbf04a3c0e1648901`

##### CUE2POPS
Windows version [here](https://www.ps2-home.com/forum/viewtopic.php?t=2148).
Mac version [here](https://github.com/suicvne/cue2pops-gui-mac).
Linux version [here](https://github.com/makefu/cue2pops-linux).

### Process

It is important to note that the file names and capitalization in this
section must be matched. POPStarter is very strict and this will not work if
your files are named differently.

1) Create a directory on your USB drive named `POPS` and copy `POPS_IOX.PAK`
   into it.

2) Install `POPSTARTER.ELF` as `XX.SOTN.ELF` on your USB drive.

3) Using a text editor, create a file named `SOTN.CUE` with this content:

```
FILE "SOTN.BIN" BINARY
  TRACK 01 MODE2/2352
    INDEX 01 00:00:00
```

4) Randomize your bin and rename the output to `SOTN.BIN`. Put this file in the
   same directory as `SOTN.CUE`.

5) Use CUE2POPS to convert `SOTN.CUE` to a VCD. Save the output to the `POPS`
   directory on your USB drive. It should be named `SOTN.VCD`.

At this point the file layout on your USB drive should look like this:

```
POPS/POPS_IOX.PAK
POPS/SOTN.VCD
XX.SOTN.ELF
```

6) Remove any game disc from your PS2 and insert your FreeMcBoot memcard and
   USB drive.

7) Start your PS2 and on the FreeMcBoot system menu, select uLaunchELF.

8) Once uLaunchELF has started, select `mass0` and then `XX.SOTN.ELF`.

Whenever you randomize a new disc image, you will need to follow the above
directions starting at step 4.
