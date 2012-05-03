/* -*- mode: js; indent-tabs-mode: nil -*- */

"use strict";

function main(method, path, query)
{
  writeln("200");
  writeln("Content-Type: text/json");
  writeln();

  try
  {
    var result = { status: "ok", issues: {}, errors: {} };

    if (critic.bts.Issue.find)
    {
      var data = JSON.parse(query && query.params.data || Encodings.decode(read()));
      var issues = critic.bts.Issue.find(data.keys);

      for (var index = 0; index < data.keys.length; ++index)
      {
        if (typeof issues[index] == "object")
          result.issues[data.keys[index]] = issues[index];
        else
          result.errors[data.keys[index]] = issues[index];
      }
    }

    write(JSON.stringify(result));
  }
  catch (exception)
  {
    write(JSON.stringify({ status: "error", error: exception.message }));
  }
}
