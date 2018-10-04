export interface Comment {
    id: string;
    created: string;
    lastUpdated: string;
    text: string;
    user: {
      id: string;
      name: string;
      displayName: string;
    }
}

/**
 * ====from dhis
 * 
 * 
 * created: "2014-10-21T10:11:19.537",
lastUpdated: "2014-10-21T10:11:19.537",
id: "Eg7x5Kt2XgV",
externalAccess: false,
text: "It might be caused by a stock-out of vaccines.",
favorite: false,
access: {
read: true,
update: true,
externalize: true,
delete: true,
write: true,
manage: true
},
user: {
id: "xE7jOejl9FI"
},
favorites: [ ],
userGroupAccesses: [ ],
attributeValues: [ ],
translations: [ ],
userAccesses: [ ]
 * 
 * 
 */