/* -*- mode: js; indent-tabs-mode: nil -*- */

"use strict";

$(function () {
  var issues = {};

  function getIssueKey(element) {
    if (/^[A-Z0-9]{2,}\-[0-9]+$/.test(element.textContent))
      return element.textContent;
    else
      return null;
  }

  function generateTooltip() {
    var issue_key = getIssueKey(this);

    if (issue_key) {
      var issue = issues[issue_key];

      if (issue) {
        if (issue.invalid) {
          return ("<table class='bts-tooltip'>"
                +   "<tr><td>Invalid:</td><td>" + critic.html.escape(issue.invalid) + "</td></tr>"
                + "</table>");
        } else {
          var redirect;
          var summary = "<tr><td>Summary:</td><td>" + critic.html.escape(issue.summary) + "</td></tr>";
          var status = "<tr><td>Status:</td><td class=nowrap> " + critic.html.escape(issue.status) + "</td></tr>";
          var reporter = "<tr><td>Reporter:</td><td class=nowrap> " + critic.html.escape(issue.reporter.fullname + " <" + issue.reporter.email + ">") + "</td></tr>";
          var resolution, assignee;

          if (issue.key.toLowerCase() != issue_key.toLowerCase())
            redirect = "<tr><td>Moved to:</td><td>" + critic.html.escape(issue.key) + "</td></tr>";
          else
            redirect = "";

          if (issue.resolution)
            resolution = "<tr><td>Resolution:</td><td class=nowrap> " + critic.html.escape(issue.resolution) + "</td></tr>";
          else
            resolution = "";

          if (issue.assignee)
            assignee = "<tr><td>Assignee:</td><td class=nowrap> " + critic.html.escape(issue.assignee.fullname + " <" + issue.assignee.email + ">") + "</td></tr>";
          else
            assignee = "";

          return ("<table class=issue>"
                +   redirect
                +   summary
                +   status
                +   resolution
                +   reporter
                +   assignee
                + "</table>");
        }
      }
    }
  }

  function handleInformation(result) {
    if (result) {
      for (var issue_key in result.issues)
        issues[issue_key] = result.issues[issue_key];

      $(document).tooltip({
        content: generateTooltip,
        items: 'a[href]',
        tooltipClass: "bts-tooltip"
      });
    }
  }

  var links = $('a[href]');

  links.each(
    function (index, element) {
      var issue_key = getIssueKey(element);
      if (issue_key)
        issues[issue_key] = null;
    });

  var issue_keys = Object.keys(issues);

  if (issue_keys.length) {
    var operation = new critic.Operation({ action: "fetch BTS issue information",
                                           url: "BTSTooltip/fetch",
                                           data: { keys: issue_keys },
                                           callback: handleInformation });

    operation.execute();
  }
});
