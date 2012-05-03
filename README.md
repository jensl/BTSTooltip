BTSTooltip
==========

BTSTooltip is an extension for the [Critic code review system][critic]. It adds
a tooltip to links whose link text looks like a BTS issue id, and actually is a
valid issue id. The tooltip contains basic information about the issue, such as
its summary, assignee and current status.

Since only links are processed, the extension depends on having a server-side
customization that turns issue ids into links to the BTS. See the administration
tutorial's [entry on linkification][linkification] for information on how to
accomplish this.

The extension also depends on having an extension API "extra" that adds BTS
access support. There is such an [extra for accessing Jira BTS systems]
[jira-bts-api].

Installation
------------

To install the extension in a Critic system, a user would create a directory
named `CriticExtensions` in his/her `$HOME`, and clone the BTSTooltip repository
into that directory.  If done correctly, the file
`$HOME/CriticExtensions/BTSTooltip/MANIFEST` should exist.

Also, `$HOME` should be world executable, and `$HOME/CriticExtensions` should be
world readable (and directories executable) for the Critic system to be able to
find and use the extension.

For more information about Critic extensions, see the [extensions tutorial]
[tutorial].  This tutorial is available in any Critic system that is
sufficiently up-to-date to have extension support.


[critic]: https://github.com/jensl/critic "Critic on GitHub"
[linkification]: https://critic-review.org/tutorial?item=customization#hyperlinks_in_text "Linkification"
[jira-bts-api]: https://github.com/jensl/jira-bts-api "Jira BTS API on GitHub"
[tutorial]: http://critic-review.org/tutorial?item=extensions "Extensions tutorial"
