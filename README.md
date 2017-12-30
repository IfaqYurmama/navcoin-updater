# navcoin-updater
A Nav Coin value updater for the offical Nav Coin subreddit (www.reddit.com/r/navcoin).

# Installation:
1. Clone the repository.
2. Navigate to the project's directory.
3. `npm install`.
4. Change name of file `credentials.example.json` to `credentials.json`.
5. Insert your Reddit credentials in file `credentials.json`.
6. Add following snippet to the stylesheet. Do *not* edit the 'content' property OR the comment:
`/* custom header navcoin price */
.hover.pagename.redditname::after{
    content: "";/*custom-header-price-node*/
    font-size: 14px;
    color: rgba(255,255,255,0.8);
    margin-top: 50px;
    display: inline-block;
    vertical-align: text-top;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 5px;
    padding: 0 5px 1px;
    text-shadow: 1px 1px 2px gray;
}`

# Usage:
1. Navigate to the project's directory.
2. Start the application with `node app`.

# Technical specifications:
- Node.js (recommended version: v7.6+)

# Collaborators:
- Dennis Majvall (https://github.com/DennisMajvall)
- Karzan Botani (https://github.com/botanki)