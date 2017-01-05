


[The Howlin Developer Guide](../home.md)



# Backup

borg init repo
borg create --stats --progress --compression lz4 repo::backup1 ~/workspace/sandbox/borg/manual
borg init /media/nixstick/
borg create --stats --progress --compression lz4 /media/nixstick/repo::backup1 manual --exclude manual/unformatted 
borg create --stats --progress --compression lz4 /media/nixstick/repo::backup1 manual --exclude manual/unformatted 
borg create --stats --progress --compression lz4 /media/nixstick/home::backup1 manual --exclude manual/unformatted 
borg create --stats --progress --compression lz4 /media/nixstick/home/::backup1 manual --exclude manual/unformatted 
borg init /media/nixstick/home
borg create --stats --progress --compression lz4 /media/nixstick/home::backup1 manual --exclude manual/unformatted 
borg extract /media/nixstick/home::backup1
borg create --stats --progress --compression lz4 /media/nixstick/home::backup2 manual --exclude manual/unformatted manual/draft
borg create --stats --progress --compression lz4 /media/nixstick/home::backup2 manual --exclude manual/unformatted --exclude manual/draft
borg extract /media/nixstick/home::backup2


borg init /media/nixstick/home
borg create --stats --progress --compression lz4 /media/nixstick/home::backup2 \
  manual                        /
  --exclude manual/unformatted  /
  --exclude manual/draft        /
borg extract /media/nixstick/home::backup2


sudo parted -s /dev/sdb mklabel gpt
sudo parted -s /dev/sdb mkpart primary 2048s 100%
cryptsetup luksFormat /dev/sdb1
sudo cryptsetup luksOpen /dev/sdb1 elephant
mkfs.ext4 /dev/mapper/elephant -L elephant

<howlinbash> hello borgs. i'm happy to say that after 6 montns of irresponsibility i'm well on the way to my first backup :-) i'm planning on having 2 backups 'root' and '/home' (i'll be excluding a few things like /proc of course). My question is. would it also be a good idea to set up and LVM snapshot each time i do this 'full-system' backup? i don't really know how lvm-snaps work but my goal in this idea is something along the lines of an osx 
<howlinbash> time machine file recovery. that with something like a snapshot i'll be able to find which backup has the missing file. I'm probably misunderstanding everything. but if i'm hoping to be able to find that needle in the haystack. are lvm-snaps a good idea or is there something already built into borg that would help me achieve the same goal? thanks
<ThomasWaldmann> guess that requires a delete :|
<ThomasWaldmann> howlinbash: borg is also the plural iirc :D
<ThomasWaldmann> howlinbash: there is a rather detailled treatment of snapshots in the latest docs
<ThomasWaldmann> what you want is, best to worst: fs snapshot, lvm snapshot, a backup without snapshot, no backup
<ThomasWaldmann> no, borg does not do snapshots in that sense
<ThomasWaldmann> root vs home is a good idea, likely you want different pruning for these
<howlinbash> ThomasWaldmann, ty. then i'll figure out a way to do snaps to complement my borg. many thanks to you and all the borg :-D
<ThomasWaldmann> mhi: append-only mode is basically just not-doing segment compaction. it just appends new data at the end of the "log" (log == repo) when doing borg create.
<ThomasWaldmann> howlinbash: your filesystem is ...?
<mhi> when the repo is accessed the currenty state is calculated on top of the log. Therefore deleted/modified items are invisible/seem to be gone/updated.
<ThomasWaldmann> mhi: yes, like that
<mhi> thats why removing the latest transactions restores the previous state unless any kind of compaction has been run.
<ThomasWaldmann> yup
<ThomasWaldmann> and only compaction frees space
<ThomasWaldmann> so, if freeing space is the goal of prune, don't run it in append-only mode
<howlinbash> ThomasWaldmann, sorry was afk, i'm ext4 on archlinux
<ThomasWaldmann> howlinbash: ok, so no fs snapshots, just lvm snapshots
<ThomasWaldmann> zfs, btrfs can do fs snapshots. but lvm snaps are also better than nothing.
<howlinbash> you probably saved me a good hour with that comment
<howlinbash> thanks
<mhi> Fine. Thanks. Well, I'm thinking about two aspects of improvement.
<ThomasWaldmann> what's a bit bad about them is that you have to have some free space in the vg
<ThomasWaldmann> enough space for all modifications done while your snapshot exists.
<howlinbash> by that do you mean i have to have full hard drives?
<ThomasWaldmann> which depends on how busy your system is and how long the backup takes
<howlinbash> i have to *not* have...
<howlinbash> i'll probs always have at least 10gb free on each partition
<ThomasWaldmann> yes, if there is no space free somewhere, you can't do a snapshot with lvm
<howlinbash> makes sense
<ThomasWaldmann> ... for the snapshot lv
<howlinbash> quick question...
* ThomasWaldmann gtg soon
<howlinbash> back to borg. if a backup was interrupted. will i be able to start again from where i left off like rsync or is it more manual?


/etc/mkinitcpio.comf
/crypto_keyfile.bin
/etc/lvm/archive/vg_00000...vg
/etc/default/grub
sudo cryptsetup luksDump /dev/sda1
IE

physical volume
volume group
logical volume

understand system
understand encryption
understand time machine
restore complete os from backup
restore individual file

install 


https://calum.org/posts/backup-your-LUKS-header-and-LVM-config
backup luks header
cryptsetup luksHeaderBackup /dev/sda2 --header-backup-file=/boot/luks-header 

backup lvm
cp /etc/lvm /boot/lvm-backup -Rafv 


## Strategy

**Big Picture**

backup to myBook
backup myBook to myBook2

**Current Space**

21
 - Size: 3.22 tb
 - Used: 1.73 tb
 - Potn: 
 - Need: 3 tb

Wolf
 - Size: 250 gb
 - Used: 
 - Potn: 
 - Need: 3 tb

SeaFile
 - Size: 3.22 tb
 - Used: 1.73 tb
 - Potn: 
 - Need: 3 tb

If I can reduce 21 space, I should be able to backup everything to the 2 drives.

Plan 
 - 1tb wolf
 - 1tb fbox
 - 1.5tb 21

what not to backup 
 - /dev
 - /lost+found
 - /mnt
 - /media
 - /proc
 - /run
 - /sys
 - /tmp

Partitions?
 - /home
 - /boot

What to Backup
 - /bin
 - /etc
 - /lib
 - /lib64
 - /opt
 - /root
 - /sbin
 - /srv
 - /usr
 - /var
 - /crypto_keyfile.bin

## Questions
 - Should I seperate root and home dirs?
 - Should I backup boot:wq

