#!/bin/bash

echo "🚀 Iniciando despliegue de la página de presentación..."

# 1. Asegurar que estamos en la rama main y hacer commit si hay cambios pendientes
git add .
if ! git diff-index --quiet HEAD --; then
    echo "💾 Guardando cambios locales..."
    git commit -m "Actualización automática: $(date +'%Y-%m-%d %H:%M:%S')"
fi

# 2. Hacer push a GitHub
echo "📤 Subiendo cambios a GitHub..."
git push origin main

# 3. Hacer pull en el servidor de Hostinger
echo "📡 Actualizando servidor Hostinger..."
ssh -i /Users/diego/.ssh/id_rsa_panel -p 65002 u211138134@195.35.10.40 "cd domains/ambrizydavalos.com/public_html && git fetch origin && git reset --hard origin/main"

echo "✅ ¡Despliegue completado con éxito!"
