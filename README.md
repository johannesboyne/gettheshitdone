gettheshitdone
==============

A simple website creating tool, package, framework whatever.

`gettheshitdone` is a very simple tool that helps you to tick off landing pages, small websites and all this kind of crap. It has a big brother, called middleman (ruby world) but because we all love Node.js I hacked it together.

## How does it work?

It is very simple. You just have to type:

```shell
gettheshitdone websitename
```

and it will auto generate the following structure:

```
 - /websitename     [dir]
 |- /source         [dir]
 |-- /css           [dir]
 |-- /img           [dir]
 |-- /includes      [dir]
 |-- /js            [dir]
 |-- /stylus        [dir]
 |-- about.jade     [file]
 |-- index.jade     [file]
 |- gtsd.server.js  [file]
 \- package.json    [file]
```

you can start hacking right away because it has generated a sample website. The routing is build through parsing the `jade` files inside the `source` directory. If you want to include templates / mixins inside a jade file, put it into includes.
A stylus middleware is integrated thus you can just write nice stylus css (just check the stylus folder).

Usually you should never care about anything else than the source directory and the jade, stylus and image files!