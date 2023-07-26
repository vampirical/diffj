# diffj

diffj is a fork of json-diff-cli that just does paths

# Usage

```
Commands:

  help [command...]                    Provides help for a given command.
  exit                                 Exits application.
  [options] <leftPath> <rightPath>     diffs the json content of two paths
```

## DIFF

### diff the json between two paths and print to the console.

```
 paths <leftPath> <rightPath> [options]
```

**`leftPath`**: The base path you would like to compare to.

**`rightPath`**: The new/updated path. The JSON from `rightPath` will be compared with the `leftPath` and changes will be printed out to the console.

### Options

```
Usage: diffj paths <leftPath> <rightPath> [options]

diffs the json response of two URLs.

Options:

  --help                        output usage information
  -o, --output <file>           print the output to a CSV file
  -f, --failOnDiff              return exit code 1 if there is a difference
  -i, --ignore <key>            ignore the provided key. You may string multipe ignore keys together by passing along more -i or --ignore options
  -k, --sortkey <key>           Sort any array of json objects by the specified key
```

### Example

#### Input

##### leftPath contents

```json
{
  "foo": {
    "bar": {
      "a": true,
      "b": "now u see me"
    }
  }
}
```

##### rightPath contents

```json
{
  "foo": {
    "bar": {
      "a": false,
      "c": "now you dont"
    }
  }
}
```

#### Output

```
key        left          right         diff
---------  ------------  ------------  -------
foo.bar.c  undefined     now you dont  added
foo.bar.b  now u see me  undefined     deleted
foo.bar.a  true          false         updated
```
