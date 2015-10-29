#!/usr/bin/env bash

## Copyright (C) 2011 Misanthropos - Deploy Mortar!
## pbupdate - for Wolfenstein - Enemy Territory
## combined with ETKEY get script

CURRENT_PATH=`pwd`
PBPATH=$HOME/.etwolf/pb
ETKEY_DIR=$HOME/.etwolf/etmain
ETKEY="$ETKEY_DIR/etkey"
PB_INSTALLED="$PBPATH/installed"

mkdir -p "$PBPATH"
if [ ! -f $PB_INSTALLED ]; then
    echo "Installing Punkbuster update"
    cp -r "$CURRENT_PATH/pb_home/"* "$PBPATH"
    echo "installed" > $PB_INSTALLED
fi

mkdir -p $ETKEY_DIR

if [ -f $ETKEY ]; then
    echo "$ETKEY already exists!"
    exit 0
fi

wget -O etkey.new http://etkey.org/distpb.php

mv etkey.new $ETKEY

if [ -f $ETKEY ]; then
    echo "ETKey generated successfully."
else
    echo "Oh oh... ETKey NOT generated!"
fi
