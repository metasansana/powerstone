
# DD 001 Boot Run Levels

## Context

Web applications typically need to preform tasks not associated with a web request.
For example, pings to a health server or just general maintenance. Some of these tasks
may be doable on the main event loop, others may make more sense as sub processes.

Furthermore, some tasks may need to be scheduled at a particular time, some at regular intervals
others at various parts of the boot process.

Which of these should we support?

## Decision

This document refers to run levels, a play on the linux [runlevel](https://wiki.debian.org/RunLevel)
system. As a powerstone application goes through its routines, it will emit events that 
can be hooked into by scripts in the run folder.

### Events

* connecting - Before connections are established.
* connected  - Connections have been established.
* accepting  - The server has began accepting requests.


### Status

Pending - Shallow imlementation in master.

## Consequences
