# Deployment
    ##EC2 Instance Creation
        - Signup on AWS
        - Create the instance
        - chmod 400 <file>.pem
        - ssh -i <file>.pem ec2 instance
        - install node version 24.11.1
        - git clone
           - If we push latest changes again do the git pull 
        - Front-end
            - Install npm i 
            - npm run build
            - sudo apt update
            - sudo apt install nginx
            - to start nginx 
                -> sudo systemctl start nginx
                -> sudo systemctl enable nginx
            - copy code from dist (build files) to /var/www/html
            - before copy should run the build command (npm run build)
            - sudo scp -r dist/* /var/www/html
            - Enable port :80 for instance
        
        - Nginx command
          - Is Nginx running => sudo systemctl status nginx
          - Is Nginx listening on port 80? => sudo ss -tulpn | grep :80
          - Check Nginx configuration => sudo nginx -t
          - Can the server itself access the page? => curl http://localhost
          - Verify files exist => ls -la /var/www/html
          - Check the root configuration => cat /etc/nginx/sites-available/default
          - Restart Nginx => sudo systemctl restart nginx
          - Check firewall (Ubuntu) => sudo ufw status
          - Check the public IP => curl ifconfig.me
          - Check Nginx logs => sudo tail -50 /var/log/nginx/error.log
                             => sudo tail -50 /var/log/nginx/access.log

          