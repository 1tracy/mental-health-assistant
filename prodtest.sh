#!/bin/sh

assert ()
{
  string1=$1
  string2=$2

  if [[ $string1 == *"$string2"* ]];
  then
    echo "'$string1': passed"
  else
    echo "'$string1' not found in text:"
    echo "$string2"
    exit 99
  fi
}

username="$RANDOM"
password="$RANDOM"
wrongpassword="x"

homepage () { curl -s https://mentalhealthme.tech; }
register () { curl -H "Content-Type: application/json" -d "{\"username\":\"$1\",\"password\":\"$2\"}" -s -X POST https://mentalhealthme.tech/api/register; }
login () { curl -H "Content-Type: application/json" -d "{\"username\":\"$1\",\"password\":\"$2\"}" -s -X POST https://mentalhealthme.tech/api/login; }

assert "$(homepage)" 200
assert "$(register "" "$password")" ""
assert "$(register "$username" "")" ""
assert "$(register "$username" "$password")" "User ${username} created successfully"
assert "$(register "$username" "$password")" "User ${username} is already registered."
assert "$(login "" "$password")" "Incorrect username."
assert "$(login "$username" "")" "Incorrect username."
assert "$(login "$username" "$wrongpassword")" "Incorrect password."
assert "$(login "$username" "$password")" "Login Successful"
echo "Tests Passed"