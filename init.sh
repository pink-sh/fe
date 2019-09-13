

export MAVEN_OPTS="-Dapprise=true $MAVEN_OPTS"

export JAVA_HOME="$(/usr/libexec/java_home -v 1.8)"

home=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

[ -n "$1" ] && [ "$1" = "clean" ] && shift && echo "cleaning existing dependencies..." && rm -rf ~/.m2/repository/apprise-embryo

mvn initialize -Pinstall-dev-runtime -q $@ 

source runtime/dev/shell.sh

mvn clean -q