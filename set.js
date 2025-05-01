const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'LUCKY-MD;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK05yTml5UVBmL2tudDNCVzNVaG9YaHpiaXZaRUU0NExDbVFQQkttMTltdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRGJURUFCWFRKSGszbGUwRWpFOWxLSXc0cFVUczhPTSsyUEsreFA2WEZGRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzQjg2eDZpajB6UTVXMUF5SHRSZ2RaM0VGZVhWdXNyRmk0c0E3OHpIR25JPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLalhpL0V0cFpwNW04ZC9Nb0xGTy84Nmx1ZmlSbDM0aGQ0ZVZKcVJsSTNvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtCSFRwbVRoZHlMSTRBVWNXSEQ4bTNYTHlUYW90cU9wSFhQb25nTnVaRUE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InAwOGxlMXZZSHZIdktVcGpXN2p3UkZDY1l3SmlVRmpzNnB5QnlObTRGanM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT09iaXFBZm82cm9QUWRLZW1NUWhWK0Z5Mjl0UUtmQkhyOHJYd0o3Qm1sZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUnRLRFBXL2c1NElFeWhQcGdIVGM4dW9rNnNCRUMyZVgzMmR0ai9STFd5ND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5HQW9PWDdkV0ZRUENLbVBUaHI5aEFCMTN6dVBGTlJxTXpONEpmQXNNY29sUFhCemVlZDJOZnFlVlgwVytyRkhXa1VqV3lGei9pM1Q5Y1l0Unl4UERRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjMsImFkdlNlY3JldEtleSI6Im9JWTZmOUY4aGxqMHY4Y09IVkdvUUFoMGVjMVlOQzBmYmNFZXRqbXovVmc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkpJby1ORlJyUW4ta01pWmh1ejV5QnciLCJwaG9uZUlkIjoiMThjOTIzZWYtZjY2MS00NjE0LWIxNzMtYmQ4OGRjZGQ5NWEyIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndjM0Q1U2FBZXBIUGN3NXl2V2lLZ0gxMStrWT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRR0dSYkZ0RWJhaVpMN0E5SVArUDY3VXd2RHM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiTDRIOUg0REYiLCJtZSI6eyJpZCI6IjI1NTc1Njg4NjQ5Mjo4QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCdlYLwnZWQ8J2Vg/CdlLwg8J2UufCdlYbwnZWQIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOR2ptT0FFRU1Tcno4QUdHQThnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJMaGxWQVExQ3ZVdklKa3BncTJDdHhCZXdGV3B2QlRCRzZROUtGd2syVnhJPSIsImFjY291bnRTaWduYXR1cmUiOiI3TnpyMTI5a3llMitMbEZFZUtiRzFFR2Nkb0VvYmxsNitaTmJiU0QydjJ1Qm11L3BHYm5QcTN6Tm9xRE93SHpicU82Q3pVUHZSS2RObm9qRktEbTNBZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiMnhzTHBFUDIyckhLaUV4dVduVkVvK3NDbkRMdDJBNXV5UzVueTVzMjVUSFhaSWo2Zi9qQmpRMlhubWhSVkZUR3Q2UDFKMUpCaHFGVVM5RDI4aFFxQ0E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTU3NTY4ODY0OTI6OEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJTNFpWUUVOUXIxTHlDWktZS3RncmNRWHNCVnFid1V3UnVrUFNoY0pObGNTIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ2MTMwMzg2LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU9XRCJ9',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/Fred1e/LUCKY_MD',
    OWNER_NAME : process.env.OWNER_NAME || "KYLE",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255756886492",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/7irwqn.jpeg",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'viewed by alpha md',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    CAPTION : process.env.CAPTION || "✧⁠LUCKY_MD✧",
    BOT : process.env.BOT_NAME || '✧⁠LUCKY_MD✧⁠',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Dodoma", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTI_DELETE_MESSAGE : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

