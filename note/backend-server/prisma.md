### Prisma Note

**Create prisma**

---

```
$ npx prisma
$ npx prisma init
```

**Create prisma migrate**

---

```
$ npx prisma migrate dev --name <init>

example
$ npx prisma migrate dev --name first-migrate
```

**Open prisma studio**

---

```
$ npx prisma studio
```

**Add prisma service into module provider before use**

---

![img-01!](./image/prisma-import-provider.png 'img-01')

**Reset Database**

---

remove all data and re-apply all migration files.

```
$ npx prisma migrate reset
```
