# Nodejs CI/CD with Github Actions and AWS EC2 with Free SSL

## Getting Started

-   STEP1 - Login to AWS console and create EC2 instance
-   STEP2 - Setup GitHub Repo and Push your project
-   STEP3 - Login to EC2 instance
-   STEP4 - Install nodejs and nginx on EC2 instance 
    ```bash
    sudo apt update

    sudo apt-get install -y ca-certificates curl gnupg
    sudo mkdir -p /etc/apt/keyrings
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

    NODE_MAJOR=18
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list

    sudo apt update
    sudo apt-get install -y nodejs

    sudo apt-get install -y nginx

-   STEP5 - Clone your project from GitHub & Check the files (For Public Repo)
    ```bash
    git clone <url>
    cd <project-name>
    ls -a
    ```

-   STEP6 - Config nginx and restart it
    ```bash
    sudo nano /etc/nginx/sites-available/default

    location / {
        proxy_pass  http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    sudo nginx -t
    sudo systemctl restart nginx
    ```

-   STEP7 - Install pm2
    ```bash
    sudo npm i -g pm2
    ```

-   STEP8 - Run backend api in the background as a service using pm2
    ```bash
    pm2 start npm --name node-cicd-api -- run start:prod
    ```
    
-   STEP9 - Generate ed25519 key & Add ed25519 key into Authorized keys
    ```bash
    ssh-keygen -t ed25519 -a 200 -C "your_email@example.com"
    cat .ssh/cicd.pub >> ~/.ssh/authorized_keys
    ```

-   STEP10 - Add PORT=22 , HOST=public ip , USER=ubuntu , KEY=private key and env vars in GitHub Secrets

-   STEP11 - Add the command in yml script of project to restart the nodejs api server after every push to the repo

-   NOTE - For Private repo before STEP5 Generate your Key with STEP9 command and add the Public key to Deploy Keys of Repo (Name = SSH_KEY)

 
##  Installing Free SSL

#### DNS Configuration

Go to your Domain Provider and configure DNS (A name / C name ) pointing to the ip of the machine.
Run and Check The domain is working or not.

####  Installing Certbot

```sh
sudo snap install core; sudo snap refresh core
```

```sh
sudo apt remove certbot
```

```sh
sudo snap install --classic certbot
```

```sh
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

#### Confirming Nginx’s Configuration
```sh
sudo nano /etc/nginx/sites-available/default
```

let edit this line:
```sh
...
server_name example.com www.example.com;
...
```

```sh
sudo nginx -t
```

```sh
sudo systemctl reload nginx
```

#### Obtaining an FREE SSL Certificate
```sh
sudo certbot --nginx -d app.example.com 
```

Output:
```
IMPORTANT NOTES:
Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/your_domain/fullchain.pem
Key is saved at: /etc/letsencrypt/live/your_domain/privkey.pem
This certificate expires on 2022-06-01.
These files will be updated when the certificate renews.
Certbot has set up a scheduled task to automatically renew this certificate in the background.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
If you like Certbot, please consider supporting our work by:
* Donating to ISRG / Let's Encrypt: https://letsencrypt.org/donate
* Donating to EFF: https://eff.org/donate-le
```

#### 10.4 Verifying Certbot Auto-Renewal
```sh
sudo systemctl status snap.certbot.renew.service
```
Output:
```
○ snap.certbot.renew.service - Service for snap application certbot.renew
     Loaded: loaded (/etc/systemd/system/snap.certbot.renew.service; static)
     Active: inactive (dead)
TriggeredBy: ● snap.certbot.renew.timer
```

To test the renewal process, you can do a dry run with certbot:

```sh
sudo certbot renew --dry-run
```

### Visit your website HTTPS://<your website>
  Enjoy Your free Nodejs server with Free SSL :)














