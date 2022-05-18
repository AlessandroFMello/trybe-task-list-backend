#!/bin/bash

# código retirado do projeto TFC da Trybe

npx -y tsc

if [ $? != 0 ]; then
  echo "Ocorreu um erro ao compilar o TypeScript, verifique seu código e tente novamente"
  exit 1
fi
