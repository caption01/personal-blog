### Docker Note

**Run many command after up container**

- using sh -c with | operator to redirect command.

- using &>/dev/null for ignore terminal output

---

```
command:
    - /bin/sh
    - -c
    - |
        npx prisma migrate deploy &&
        npx prisma studio &>/dev/null && <-- this cmd need to ignore output
        npm run start:dev
```
