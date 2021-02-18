# diskover - File system crawler, disk space usage, file search engine and storage analytics powered by Elasticsearch

[![License](https://img.shields.io/github/license/shirosaidev/diskover.svg?label=License&maxAge=86400)](./LICENSE)

<img align="left" width="249" height="189" src="docs/diskover.png?raw=true" hspace="5" vspace="5" alt="diskover">

diskover is an open source file system crawler and disk space usage software that uses [Elasticsearch](https://www.elastic.co/products/elasticsearch) to index and manage data across heterogeneous storage systems. Using diskover, you are able to more effectively search and organize files and system administrators are able to manage storage infrastructure, efficiently provision storage, monitor and report on storage use, and effectively make decisions about new infrastructure purchases.

As the amount of file data generated by businesses continues to expand, the stress on expensive storage infrastructure, users and system administrators, and IT budgets continues to grow.

Using diskover, users can identify old and unused files and give better insights into data change, file duplication and wasted space. diskover supports crawling local file-systems, crawling NFS/SMB, cloud storage, etc. [Plugins](https://github.com/shirosaidev/diskover/wiki/Plugins) can be used for adding additional meta data.

diskover runs on Linux, macOS and Windows 10 using Python 3.

**diskover requires an auth token to run, learn more on the [wiki](https://github.com/shirosaidev/diskover/wiki/Auth-token). Sign up to download diskover and receive your auth token at https://diskoverdata.com/diskover/.**

## News/ Updates
diskover v2 will be released soon (Q1 2021), please sign up and register at https://diskoverdata.com/diskover/ for updates and join diskover Slack. **v1 will be discontinued soon and no longer supported.**

<br>
<blockquote><h3><q>This is the first tool I've found that can index 7m files/2m directories in under 20 min</q></h3> -- linuxserver.io community member</blockquote>
<br>

## Screenshots (v1)

diskover crawler and workerbots running in terminal<br>
<img align="left" width="400" src="https://github.com/shirosaidev/diskover/raw/master/docs/diskover-crawler-terminal-screenshot.png?raw=true" alt="diskover crawler">
<img width="400" src="https://github.com/shirosaidev/diskover/raw/master/docs/diskover-workerbot-terminal-screenshot.png?raw=true" alt="diskover worker bot"><br>
[diskover-web](https://github.com/shirosaidev/diskover-web) (diskover's web file manager, analytics app, file system search engine, rest-api)<br>
<img align="left" width="400" src="https://github.com/shirosaidev/diskover-web/raw/master/docs/diskover-web-dashboard-screenshot.png?raw=true" alt="diskover-web dashboard">
<img width="400" src="https://github.com/shirosaidev/diskover-web/raw/master/docs/diskover-web-filetree-screenshot.png?raw=true" alt="diskover-web file tree">
<img align="left" width="400" src="https://github.com/shirosaidev/diskover-web/raw/master/docs/diskover-web-advancedsearch-screenshot.png?raw=true" alt="diskover-web advanced search">
<img width="400" src="https://github.com/shirosaidev/diskover-web/raw/master/docs/diskover-web-tags-screenshot.png?raw=true" alt="diskover-web tags"><br>
Kibana dashboards/saved searches/visualizations and support for Gource<br>
<img align="left" width="400" src="docs/kibana-dashboarddark-screenshot.png?raw=true" alt="kibana-screenshot">
<img width="400" src="docs/diskover-gource1-screenshot.png?raw=true" alt="diskover-gource">

### diskover v1 Gource videos

<a href="https://youtu.be/InlfK8GQ-kM"><img align="left" width="400" src="https://img.youtube.com/vi/InlfK8GQ-kM/0.jpg" alt="gource video"></a>
<a href="https://youtu.be/qKLJjZ0TMqA"><img width="400" src="https://img.youtube.com/vi/qKLJjZ0TMqA/0.jpg" alt="gource video"></a>

## Enterprise vs community versions

If you are a business and would like to inquire about diskover enterprise, please visit https://diskoverdata.com to learn more and to contact us.

## Installation Guide

**For a detailed install guide for linux and docker, please see the [Install Guide wiki page](https://github.com/shirosaidev/diskover/wiki/Installation-Guide)**

### Requirements (v1)

* `Linux, macOS, Windows 10 (WSL)` **Native Windows support in v2**
* `Python 2.7+ or 3.5+` **Python 2 will not be supported in v2**
* `Elasticsearch 5.6.x` (local or cloud) **ES 7.x in v1 enterprise and v2**
* `Redis 4.x` **Redis is no longer used in v2**

### Optional Installs

* [diskover-web](https://github.com/shirosaidev/diskover-web) (diskover's web file manager and analytics app)
* [saisoku](https://github.com/shirosaidev/saisoku) (data sync/mover between on-prem to cloud, etc)
* [sharesniffer](https://github.com/shirosaidev/sharesniffer) (for scanning your network for file shares and auto-mounting for crawls)
* [Redis RQ Dashboard](https://python-rq.org/docs/monitoring/) (for monitoring redis queue)
* [Kibana](https://www.elastic.co/products/kibana) (for visualizing Elasticsearch data, tested on Kibana 5.6.9)
* [X-Pack](https://www.elastic.co/downloads/x-pack) (Kibana plugin for graphs, reports, monitoring and http auth)
* [netdata](https://my-netdata.io/) (for realtime monitoring cpu/disk/mem/network/elasticsearch/redis/etc metrics, plugin for rq-dashboard in netdata directory)
* [Grafana ES dashboard](https://grafana.com/dashboards/878) (Grafana dashboard for Elasticsearch)
* [crontab-ui](https://github.com/alseambusher/crontab-ui) (web ui for managing cron jobs - for scheduling crawls)
* [cronkeep](https://github.com/cronkeep/cronkeep) (alternative web ui for managing cron jobs)
* [Gource](http://gource.io) (for Gource visualizations of diskover Elasticsearch data, see videos above)

### Download

To download diskover, please sign up for an account at https://diskoverspace.com/diskover/.


## Getting Started (v1)

In order to run diskover, you first need to create an account and get your auth code at https://diskoverdata.com/diskover/
Once you have created an account and verified, login to receive your auth token. You can learn more about where to [set your auth token](https://github.com/shirosaidev/diskover/wiki/Auth-token) on the wiki.

Check Elasticsearch and Redis are running and are the required versions (see requirements above).
```sh
$ curl -X GET http://localhost:9200/
$ redis-cli info
```

Install Python dependencies using `pip`.

```sh
$ pip install -r requirements.txt
```

Copy diskover config `diskover.cfg.sample` to `diskover.cfg` and edit for your environment.

Start diskover worker bots (a good number might be cores x 2) with:

```sh
$ cd /path/with/diskover
$ python diskover_worker_bot.py
```

Worker bots can be added during a crawl to help with the queue. To run a worker bot in burst mode (quit after all jobs done), use the -b flag. If the queue is empty these bots will die, so use `rq info` or `rq-dashboard` to see if they are running. 

To start up multiple bots, run:

```sh
$ cd /path/with/diskover
$ ./diskover-bot-launcher.sh
``` 

By default, this will start up 8 bots. See -h for cli options including changing the number of bots to start. Bots can be run on the same host as the diskover.py crawler or multiple hosts in the network as long as they have the same nfs/cifs mountpoint as rootdir (-d path) and can connect to ES and Redis (see wiki for more info). **Edit this file and check the paths are set correct at the top of the file to the same version of Python that you will be running diskover.py with, they need to be the same or you could run into issues.**

### Usage examples (v1)

See all [cli options](https://github.com/shirosaidev/diskover/wiki/CLI-options) in the wiki.

Start diskover main job dispatcher and file tree crawler with (using adaptive batch size and optimize index cli flags):

```sh
$ python /path/to/diskover.py -d /rootpath/you/want/to/crawl -i diskover-indexname -a -O
```

**Defaults for crawl with no flags is to index from . (current directory) and files >0 Bytes and 0 days modified time. Empty files and directores are skipped (unless you use -s 0 and -e flags). Symlinks are not followed and skipped. Use -h to see cli options.**

Don't prompt user to overwrite existing index:

```sh
$ python /path/to/diskover.py -d /rootpath/you/want/to/crawl -i diskover-indexname -a -O -F
```

Use 32 tree walk threads (default is cpu cores x 2):

```sh
$ python /path/to/diskover.py -d /rootpath/you/want/to/crawl -i diskover-indexname -a -T 32
```

Crawl down to maximum tree depth of 3:

```sh
$ python diskover.py -i diskover-indexname -a -d /rootpath/to/crawl -M 3
```

Only index files which are >90 days modified time and >1 KB filesize:

```sh
$ python diskover.py -i diskover-indexname -a -d /rootpath/to/crawl -m +90 -s 1024
```

Only index files which have been modified in the last 7 days including empty files and dirs:

```sh
$ python diskover.py -i diskover-indexname -a -d /rootpath/to/crawl -m -7 -s 0 -e
```

Distribute file meta collecting amongst bots and split file lists for directories with many files (can help to keep all bots busy if your file tree has directories with many files):

```sh
$ python diskover.py -i diskover-index -a -d /rootpath/to/crawl --splitfiles --splitfilesnum 5000 --chunkfiles --chunkfilesnum 500
```

Find [duplicate files](https://github.com/shirosaidev/diskover/wiki/Duplicate-files-(dupes)) in an index (after crawl finishes):

```sh
$ python diskover.py -i diskover-indexname -a --finddupes
```

Find ["hot dirs"](https://github.com/shirosaidev/diskover/wiki/Comparing-(diff)-files-between-two-indexes) and change % between two indices (after crawls are complete):

```sh
$ python diskover.py -i diskover-latestindex -a -H diskover-previndex
```

Store [cost per gb](https://github.com/shirosaidev/diskover/wiki/Cost-per-GB) (Enterprise ver. only) in es index from diskover.cfg settings and use size on disk (disk usage) instead of file size:

```sh
$ python diskover.py -i diskover-index -a -d /rootpath/to/crawl -G -S
```

Tree walk and enqueue all jobs into RQ with no bots running (don't wait for bots). This could allow you to tree walk during the day and build up a large queue of all the crawl jobs with no stat calls hitting the storage and then in the evening start up the bots to do the crawl jobs and the heavy stating on the storage:

```sh
$ python diskover.py -i diskover-index -a -d /rootpath/to/crawl --nowait
```

Create index with just level 1 directories and files, then run background crawls in parallel for each directory in rootdir and merge the data into same index. After all crawls are finished, calculate rootdir doc's size/items counts. This could be used if you want to get a very high queue fill rate on a very large directory tree and a regular diskover crawl is not filling the queue fast enough and bots are starved for jobs:

See [parallel crawl script](https://github.com/shirosaidev/diskover/blob/master/scripts/parallel_crawl.sh) for an example of scripting this.

```sh
$ python diskover.py -i diskover-indexname -a -d /rootpath/to/crawl --maxdepth 1
$ python diskover.py -i diskover-indexname -a -d /rootpath/to/crawl/dir1 --reindexrecurs -q &
$ python diskover.py -i diskover-indexname -a -d /rootpath/to/crawl/dir2 --reindexrecurs -q &
...
$ python diskover.py -i diskover-indexname -a -d /rootpath/to/crawl --dircalcsonly --maxdcdepth 0
```


## User Guide

[Read the wiki](https://github.com/shirosaidev/diskover/wiki) for more documentation on how to use diskover.

## Discussions/Support

For discussions or support for diskover join the [diskover Slack workspace](https://join.slack.com/t/diskoverworkspace/shared_invite/enQtNzQ0NjE1Njk5MjIyLWI4NWQ0MjFhYzQyMTRhMzk4NTQ3YjBlYjJiMDk1YWUzMTZmZjI1MTdhYTA3NzAzNTU0MDc5NDA2ZDI4OWRiMjM).

## Bugs

For bugs about diskover, please use the [issues page](https://github.com/shirosaidev/diskover/issues).

## License

See the [license file](https://github.com/shirosaidev/diskover/blob/master/LICENSE).
