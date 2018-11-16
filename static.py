import mailbox

mail = mailbox.mbox('./mlpack.mbox')
//print(len(mail))

for i in mail:
    