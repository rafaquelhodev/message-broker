# message-broker

Message broker in Javascript using publish-subscript design pattern.


## Create local IPC server

```sh
node pub-sub-server.js
```

## Subscribe to a channel

```sh
node connect-pub-sub-server.js -name="<client>"
sub_<channel>
```
## Publish message in a channel

```sh
pub_<channel>_<message>
```