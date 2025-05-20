FROM nginx:1.21.6

# Remove any existing config files
RUN rm /etc/nginx/conf.d/*

# Copy config files
# *.conf files in "conf.d/" dir get included in main config
COPY templates/ /etc/nginx/templates/

# Expose the listening port
EXPOSE 443

# Launch NGINX
CMD [ "nginx", "-g", "daemon off;" ]
