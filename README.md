# Enemy Territory + True Combat:Elite

This repository tries to distribute the old game [Enemy Territory](http://www.enemy-territory.com/)
together with [True Combat:Elite](http://www.truecombat.net/).

Installing the games is still a lot of PITA. The goal of this repository is to make the installation must easier.

## What is included

- Enemy Territory 2.60b
- True Combat:Elite 0.49b
- Punkbuster

## Supported operating systems

- Linux

## Setup

TBD

## License

When using the software included you agree to the LIMITED USE SOFTWARE LICENSE AGREEMENT of
[Enemy Territory](EULA_Wolfenstein_Enemy_Territory.txt) and [True Combat:Elite](EULA_TrueCombat_Elite.txt).

## Working with the repository

Github's [Large File Storage system](https://git-lfs.github.com/) (LFS) is used to store the large binary files.
This mean you'll need the LFS module for Git installed on your system.

The provided Vagrantfile can help you to get such setup into a virtual maschine (VM).
Make sure you installed [Vagrant](https://www.vagrantup.com/) on your system, then run:

```
vagrant up
```

This will download the required base box and will provide git and lfs inside of the virtual maschine.

After the setup was finished you can log into the VM:

```
vagrant ssh
```

Change the directory to `/vagrant` and run

```
git fetch
```
