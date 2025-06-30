# -------- Frontend Build --------
    FROM node:20 AS frontend-build
    WORKDIR /app/frontend
    COPY frontend/package*.json ./
    RUN yarn install
    COPY frontend/ .
    RUN yarn build
    
    # -------- Backend Build --------
    FROM node:20 AS backend-build
    WORKDIR /app/backend
    COPY backend/package*.json ./
    RUN yarn install
    
    COPY backend/prisma ./prisma
    
    RUN yarn prisma generate
  
    # Jetzt den eigentlichen Backend-Code kopieren
    COPY backend/ .
    
    RUN yarn build
    
    # -------- Production Image --------
    FROM node:20
    WORKDIR /app
    
    # Kopiere dist, package.json, node_modules etc.
    COPY --from=backend-build /app/backend/dist ./backend/dist
    COPY --from=backend-build /app/backend/package*.json ./backend/
    COPY --from=backend-build /app/backend/node_modules ./backend/node_modules
    COPY --from=backend-build /app/backend/prisma ./backend/prisma
    
    COPY --from=frontend-build /app/frontend/build ./backend/public
    
    WORKDIR /app/backend
    
    
    EXPOSE 3000
    CMD ["yarn", "serve"]