#!/usr/bin/env bash
set -e

# Start a virtual X display in the background. ANGLE (the GLES backend
# headless-gl uses on Linux) calls XOpenDisplay during gl context creation
# and segfaults when no display is reachable.
#
# Inline-Xvfb instead of xvfb-run: xvfb-run hangs in some containers waiting
# for X server lockfile coordination, and its output redirection swallows
# stdout/stderr. A bare backgrounded Xvfb + DISPLAY export is what every
# headless-gl-in-Docker recipe converges on.

Xvfb :99 -screen 0 16x16x24 -nolisten tcp >/dev/null 2>&1 &
export DISPLAY=:99

# Tiny wait loop for the X socket to appear. Bounded so a broken Xvfb fails
# fast instead of hanging forever.
for _ in $(seq 1 40); do
  if [ -e /tmp/.X11-unix/X99 ]; then break; fi
  sleep 0.05
done

# Exec replaces this shell with the node process so signals (SIGTERM from
# Fly's auto-stop) propagate cleanly and the proxy is PID 1's child.
exec "$@"
