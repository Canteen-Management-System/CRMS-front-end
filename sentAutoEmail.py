import smtplib
from email.message import EmailMessage

EMAIL_ADDRESS = "noureddein@gmail.com"
EMAIL_PASSWORD = "lqqavokpdpjzjzhw"
companyNames = [
    "Terkwaz Business Solutions",
    "PandoSoft",
    "Optimiza",
    "Echo Technology",
    "RealSoft",
    "Sprintward",
    "NUR interactive",
    "Nafith",
    "Atypon",
    "Leading Point",
    # "Tanasuk",
    "Expedia",
    "Develop Way",
    "WeWebit",
    "Aspire",
    "Eskadenia",
    "Foresite",
    "IstanbulIT",
    "MenaCircle",
    "ChainReaction",
    "ProTech",
    "WingsSoft",
    "IN4MA",
    "Estarta Solution",
    "MenaiTech",
    "InCube",
    "JordanCode",
    "Electronic Health Solutions",
    "A2A",
    "INTEGRATED TECHNOLOGY GROUP ",
    "Aspire",
    "Rubikomm",
    "Cromapix",
    "ClickJordan",
    "ProgreSsoft",
    "SSSProcess",
    "Recovery",
    "SIMS Creation",
    "Tahaluf Al-Emarat Technical Solutions",
    "NextStage",
    "Vibes Solutions",
    "Open Sooq"
]

contacts = [
    "info@terkwaz.com",
    "careers@pando-soft.com",
    "careers@optimizasolutions.com",
    "info@echo-jo.com",
    "info@realsoft-me.com",
    "jobs@sprintward.com",
    "hr@nurinteractive.com",
    "info@nafith.com",
    "info@atypon.com ",
    "info@leading-point.com",
    # "hello@tanasuk.com", // 15-12-2021
    "life@expedia.com",
    "info@developway.com",
    "info@wewebit.com",
    "info@aspire.jo",
    "pr@eskadenia.com",
    "feedback@foresite.jo",
    "info@ist-development.com",
    "info@menacircle.com",
    "letstalk@chainreaction.ae",
    "info@protech-soft.com",
    "Info@Wingssoft.Com",
    "shadi@in4ma.com",
    "Careers@estartasolutions.com",
    "Hr@menaitech.com",
    "Info@e-incube.com",
    "info@jordancode.com",
    "hr_department@ehs.com.jo",
    "info@access2arabia.com",
    "rmajali@itgsolutions.com",
    "info@aspire.jo",
    "info@rubikomm.com",
    "info@cromapix.com",
    "dev@clickjordan.net",
    "internship@progressoft.com",
    "info@SSSProcess.com",
    "info@recoveryjo.com",
    "sami.albadri@simscreation.net",
    "haethamayasa@gmail.com",
    "info@nextstagejo.com",
    "info@vibessolutions.com",
    "careers@opensooq.com"
]

files = ["CV-Edits V3.3 Training.pdf"]

msg = EmailMessage()


def msgBody(companyName):
    msg["Subject"] = "Internship Opportunity"
    msg["From"] = EMAIL_ADDRESS
    # msg["To"] = receiver
    msg.set_content(
        f"""
        Dear Hiring Manager
        
        I am motivated to contact you to learn if {companyName} has an opening for a new Web Developer internship, and I want to take this opportunity to introduce myself.

        I am dedicated, hard working, skilled in problem-solving and time management. I work well with others, but I can also take initiatives and get things done on my own. I catch on quickly and work hard to continuously expand my skill set. Just a few of my abilities include:

        •	NodeJS
        •	HTML, CSS, JavaScript
        •	PostgreSQL

        I am certain that I will be a great addition to your company.

        I would greatly appreciate your review of my enclosed resume and outlined credentials. I believe that I can be a valuable addition to {companyName} and your business goals. At your convenience, I am available for an interview or further discussion. I look forward to your response.


        Sincerely,
        Nour Eddein Al Abassi
    """
    )

    for file in files:
        with open(file, "rb") as f:
            file_data = f.read()
            file_name = f.name
        msg.add_attachment(
            file_data,
            maintype="application",
            subtype="octet-stream",
            filename=file_name,
        )
    return msg


for i in range(0, len(contacts)):
    msg["To"] = contacts[i]
    server = smtplib.SMTP(host="smtp.gmail.com", port=587)
    server.starttls()
    server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
    server.send_message(msgBody(companyNames[i]))
    server.quit()
    msg.clear()
    print("--- Done --- ", companyNames[i], ' ', contacts[i])

print("Finished")
