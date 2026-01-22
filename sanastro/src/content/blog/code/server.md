---
cover: "../../../assets/blog/code/server/cover.png"
coverAlt: "Server"
# banner: "../../../assets/blog/code/server/banner.png"
# bannerAlt: "Server"

title: "Server"
description: "A log of how I first set up a small home server."
# author:
publicationDate: 2023-01-15
# creationDate: "January 2023"
sortOrder: 1
---

This is very outdated, and my setup has become relatively sophisticated since (VPNs, Pi-hole, media management, you know), but I'm still a noob at this stuff.

# Goals

A general purpose home server was a personal goal of mine for a long time.

The server was intended to be a headless Dell OptiPlex with a fourth-generation Intel i5 processor and 8 GB of RAM, but I decided to run it on my old laptop before making a purchase. I wanted to use this server only as a Network Attached Storage (NAS) device, as well as to host a Minecraft server, but ended up giving it extra QoL features.

It runs Ubuntu Server 20.04 and CasaOS. Proxmox would be nice but CasaOS' GUI is really useful for my family to toy with the server as well.

# Walkthrough

### Disclaimer

This was my first foray into self hosted servers. I am talking about things I barely know anything about. There are things I'm doing terribly wrong.

Each numbered steps are written in direct speech akin to that of a tutorial, but only follow said steps if you want to do exactly what I have done (read as: in a wrong manner), for this is intended to be a documentation of my journey rather than a guide.

## I. Install Ubuntu Server

Ubuntu Server was chosen because the server was intended to be run headlessly, and Ubuntu has a large repository of support articles and forum posts. It is a good starting point for those who have only used distros where the user does not often interact with the terminal. (In my case, this was Mint.) A complete beginner to Linux might prefer a distro with a proper desktop environment.

1. Go to the <a href="https://ubuntu.com/download/server" target="_blank" class="extlink">Ubuntu Server</a> page and download the iso image.
2. Create a boot drive using <a href="https://rufus.ie/en/" target="_blank" class="extlink">Rufus</a>, or through the context menu if you are on Linux.
3. Plug in the USB drive into the laptop.
4. From the BIOS, select the USB drive as Boot Priority 1.
5. Follow the steps on screen, but note the following:
    - Disable LVM groups.
    - Install OpenSSH server.
    - Install Docker.

I set the name to `Sanalog`, server name to `sanalog-server`, and created a username and password. DHCP assigned `192.168.18.44` and `192.168.18.30` to LAN and WLAN respectively.

## II. Connect SSH

On Windows Powershell, run `ssh sanalog@192.168.18.44`, and type in the password.

Then run `sudo apt update` and `sudo apt upgrade` as a test, and also to get everything up to date.

## III. Samba setup

Samba is used to create a directory (folder) that will be shared on the network. This allows the server to function as a NAS for speedy file sharing across devices without compression, as well as a central location to store backup files.

1. Run `sudo apt install samba`.
2. Run `samba --version` to verify it's installed.
3. Run `cd` to go to the home directory (`/home/sanalog/`), then `mkdir sanalog-share`.
4. Run `sudo nano /etc/samba/smb.conf`. Scroll all the way down and append the following line:

    ```markdown
    [sanalog-share]
    	comment = Sanalog Samba Share
    	path = /home/sanalog/sanalog-share
    	read only = no
    	browsable = yes
    ```
    
5. Run `sudo service smbd restart`, then `sudo ufw allow samba`.
6. Create a password by running `sudo smbpasswd -a sanalog`, then type in a password.

At this point, the network drive can be added on any device on the local network. On Windows, the path is `\\192.168.18.44\sanalog-share`. A login prompt will appear. On iOS’ Files and OneUI’s My Files, there are individual text fields for the IP address, port, username, and password. The SMB protocol uses port `445`.

## IV. Docker setup

<a href="https://www.docker.com/" target="_blank" class="extlink">Docker</a> is pretty cool. It allows you to run applications as containers, that can be readily found online. If all goes well, adding features to our server should be as easy as installing apps from the app store. Docker will be used to set up the Minecraft server, as well as a VPN.

1. Run `docker --version` to verify that it's installed.
2. Run `docker ps`. This should throw an error.
3. Run `sudo groupadd docker` and `gpasswd -a sanalog docker`.
4. Reboot the server by executing `sudo reboot`. Re-establish the SSH connection.
5. Now `docker ps` should list all running containers (which should be zero).

## V. PaperMC setup

1. Create a folder by going to home directory, then running `mkdir mc-docker`.
    - You can verify its creation by running `ls`.
2. Now go to <a href="https://hub.docker.com/r/marctv/minecraft-papermc-server" target="_blank" class="extlink">marctv’s PaperMC container page</a>, and copy the quick start command. 
3. On your favourite text editor, edit the relevant fields, so that it looks something like:
    
    ```markdown
    docker run \
      -d \
      -it \
      --name PGMC \
      --restart=unless-stopped \
      -e MEMORYSIZE='6G' \
      -v /home/sanalog/mc-docker:/data:rw \
      -p 25565:25565 \
    -i marctv/minecraft-papermc-server:1.19
    
    #edit: add -p 8080:8080 for BlueMap
    ```
    
    `name` is the name of the Docker container. Make this simple since it will be typed repetitively.
    
4. Paste the above into the SSH terminal.

At this point, the server should be open and available for any device on the server's local network. In Minecraft, use `192.168.18.44` as server address and a connection should be established.

## VI. Configuring Minecraft world

I planned to continue using a world that was running on a different server, so I downloaded the world folder in order to clean it up. This was done by deleting:

- Old logs
- Unnecessary config files
- Unused plugins
- Userdata for those not playing in the world any more
- All `.jar` files for previous versions of the game

Then, `spitgot.yml`, `paper.yml`, and `server.properties` were edited, before the following:

1. Send the world folder to `/home/sanalog/sanalog-share/` from File Explorer by using the SMB share that was set up
2. Delete mc-docker from `/home/sanalog/` by using `rmdir`.
3. Move the world folder from the share folder to home directory by using `mv`.
    - You can rename it in one command, or use `mv` again to rename it to `mc-docker`.

A faster alternative is to use a file manager with a GUI. They can be installed using Docker, but I found SFTP via Filezilla (or any FTP client) to be painless, since it requires no setup apart from a working SSH connection.

## VII. DHCP and Port Forwarding

Every IP address used in the previous steps was a local IP address. In order to access SSH, network drive, and Minecraft servers from another network, the external IP has to be used instead, which can be found through the router's control panel.

SSH uses port `22`, while SMB uses `445`, and Minecraft `25565`. Ports used by these services have to be forwarded so that they work with the external IP. This is also done via changing router settings.

Different OEMs have different interfaces for their router control panel. <a href="http://portforward.com/" target="_blank" class="extlink">portforward.com</a> might be useful if some of the options seem to be missing or inaccessible.

1. Access the router control panel. Mine was via `192.168.18.1`.
    - If there are multiple routers daisy chained like my home network is configured, the one connected to the Internet (i.e. the modem) is the one to be configured.
    - Find the WAN (aka public, aka external) IP address.

2. Find `sanalog-server`. It should have the IP `192.168.18.44`.

3. Change IP address allocation from DHCP to Static. This may be called DHCP Reservation or something similar.

4. Forward ports `22`, `445`, and `25565` for `sanalog-server`. `25565` should use `TCP/UDP` while the rest can use `TCP`.

Now, everything that has been previously set up should be accessible from a device that is not on the local network. You can test this by using the external IP address as a server address in Minecraft, logging in, then checking the Docker log by running `docker logs PGMC` from the terminal. The client's IP address should be the external IP address of the client device's network, and not its local IP address.

Theoretically, opening SMB and SSH to WAN could be made secure, but port forwarding for SSH and SMB is generally considered to be stupid. This is a temporary solution before a VPN to the local network is configured, so that devices on another network can SSH/SMB on LAN instead. Realistically, I doubt any bad actors would cause harm to a small-scale personal experiment like this one, but practice caution and do not upload any sensitive data onto the network drive.

## Intermission

That's it. The NAS works, and the Minecraft server works. The initial goals have been achieved!

The remaining steps are not absolutely necessary, but they will help in making the operation and maintenance of the server effortless, as well as making it easy to expand the server's capabilities.

Here is a sneak peek, so that some steps can be skipped if there is no need for them:

- DDNS redirect &centerdot; keep external IP private
- Portainer &centerdot; manage Docker containers using a web GUI.
- Wireguard &centerdot; create a VPN to the local network.
- Headless mode &centerdot; keep server running with lid closed and screen off.

### Useful commands

`ifconfig` &#xB7; in case you have network issues.

`docker ps`

`docker attach __`

`docker start/stop/restart __`

`docker logs __`

`top` &#xB7; used to view system resource usage. The i5-5200U only hit a peak of 62.5% with default server properties and one player online. I like colours so I got `htop` to work as well.

<br><br><br>

*Note: the remaining sections have been omitted as i remade the whole thing from scratch based on CasaOS.*