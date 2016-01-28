package main

import (
        "fmt"
        "os"
        "os/user"
        "os/exec"
        "path/filepath"
        "io"
        "io/ioutil"
        "net/http"
        "runtime"
)

func CopyFile(source string, dest string) (err error) {
    sourcefile, err := os.Open(source)
    if err != nil {
        return err
    }

    defer sourcefile.Close()

    destfile, err := os.Create(dest)
    if err != nil {
        return err
    }

    defer destfile.Close()

    _, err = io.Copy(destfile, sourcefile)
    if err == nil {
        sourceinfo, err := os.Stat(source)
        if err != nil {
            err = os.Chmod(dest, sourceinfo.Mode())
        }

    }

    return
}

func CopyDir(source string, dest string) (err error) {

     // get properties of source dir
     sourceinfo, err := os.Stat(source)
     if err != nil {
         return err
     }

     // create dest dir

     err = os.MkdirAll(dest, sourceinfo.Mode())
     if err != nil {
         return err
     }

     directory, _ := os.Open(source)

     objects, err := directory.Readdir(-1)

     for _, obj := range objects {

         sourcefilepointer := source + "/" + obj.Name()

         destinationfilepointer := dest + "/" + obj.Name()


         if obj.IsDir() {
             // create sub-directories - recursively
             err = CopyDir(sourcefilepointer, destinationfilepointer)
             if err != nil {
                 fmt.Println(err)
             }
         } else {
             // perform copy
             err = CopyFile(sourcefilepointer, destinationfilepointer)
             if err != nil {
                 fmt.Println(err)
             }
         }

     }
     return
}

func check(e error) {
    if e != nil {
        panic(e)
    }
}

func main() {
        var home string
        var pbpath string
        var etkeyDir string
        var etkey string
        var pbInstalled string
        var isPbInstalled bool

        cwd, err := filepath.Abs(filepath.Dir(os.Args[0]))
        check(err)

        usr, err := user.Current()
        check(err)

        home = usr.HomeDir
        pbpath = home + "/.etwolf/pb"
        etkeyDir = home + "/.etwolf/etmain"
        etkey = etkeyDir + "/etkey"
        pbInstalled = pbpath + "/installed"

        fmt.Println("Installing files to " + home)

        _, err = os.Stat(pbInstalled)
        isPbInstalled = !os.IsNotExist(err)

        os.MkdirAll(pbpath, 0777)
        if false == isPbInstalled {
            fmt.Println("Installing Punkbuster update")
            CopyDir(cwd + "/pb_home", pbpath)
            os.Create(pbInstalled)
        }

        os.MkdirAll(etkeyDir, 0777)

        if _, err = os.Stat(etkey); err == nil {
            fmt.Println(etkey + " already exists!")
        } else {
            res, err := http.Get("http://etkey.org/distpb.php")
            check(err)

            etkeyContent, err := ioutil.ReadAll(res.Body)
            res.Body.Close()

            check(err)

            f, err := os.Create(etkey)
            check(err)

            defer f.Close()

            f.Write(etkeyContent)
            f.Sync()
            fmt.Println("ETKey generated successfully.")
        }

        _ , err = os.Stat(cwd + "/tce.lnk");
        if runtime.GOOS == "windows" && os.IsNotExist(err) {
            os.Chdir(cwd)
            fmt.Println(os.Getwd())
            c := exec.Command(
                cwd + "\\Shortcut.exe",
                "/F:TCE.lnk",
                "/A:c",
                "/T:" + cwd + "\\ET.exe",
                "/P:+set fs_game tcetest +set com_hunkMegs 192 +set com_zoneMegs 64 +set com_soundMegs 64 +seta cl_maxpackets 125 +seta cl_packetdup 0 +seta snaps 40 +seta rate 25000")

            if err := c.Run(); err != nil { 
               panic(err)
            }
        }

        os.Exit(0)
}
