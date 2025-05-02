# VogelSocialMedia
Eine Social Media Plattform zum Teilen von Vogelbildern
## Versionskontrolle
Wir verwenden git um eine Versionskontrolle zu gewährleisten. Um ein neues Feature anzufangen **muss** ein neuer Branch erstellt werden.

>Es wird unter keinen umständen im `master` Branch gecodet!

Ist ein Feature fertig, so wird es erst von einem oder mehreren Teammitgliedern abgesegnet und dann in den `master` Branch gemerged. 
Wir arbeiten mit [GitHub Flow](https://www.gitkraken.com/learn/git/best-practices/git-branch-strategy).

Der `master` Branch beinhaltet immer die ***aktuelle*** und ***funktionierende*** Version des Codes. 
Um an einem Feature zu arbeiten muss ein neuer Branch erstellt werden indem man nur diese eine Feature bearbeitet.
Sozusagen für jede Karte im Backlog ein Brach (außer es hat nichts mit dem Code zu tun).

>Nur eine Person arbeitet an einem Branch!

Wenn das Feature fertig ist muss man wie [hier](https://medium.com/singlestone/a-git-workflow-using-rebase-1b1210de83e5 ) erklärt einen **rebase** machen um den Branch auf den aktuellen Stand des `master` Branch zu bringen.

>Bei dem Artikel alles zu dem Thema **Fork** ignorieren.
>Einfach lokal arbeiten.

Danach kann eine **Pull Request** gemacht werden und der Branch in `master` **gemerged** werden.
Commit Nachrichten sollten sinnvoll geschrieben werden (siehe Links).

Hier nocheinmal eine kurze Zusammenfassung:
  1. Der Code im `master` branch sollte fehlerlos funktionieren
  2. Erstelle Branches immer basierend auf dem `master` branch, z. B. `feature/add-new-payment-types`
  3. Committe deine Arbeit immer auf deinen Branch und pushe deine Arbeit regelmäßig
  4. Wenn du fertig bist, starte einen Pullrequest
  5. Nachdem deine Arbeit von anderen approved wurde kann dein Branch in den `master` Branch gemerged werden

![image](https://github.com/user-attachments/assets/3dda8688-6eee-4a8e-895e-9c1fc2459226)


## Umgang mit Stories
Bevor mit einer Aufgabe angefangen wird muss eine Story dazu im Backlog stehen. Diese beinhaltet eine Description, in welcher mit einem Satz beschrieben wird was und warum etwas gemacht werden soll. Ein Beispiel hierfür wäre: "Als Nutzer:in möchte ich ein Bild löschen können, um Bilder, welche mir nicht gefallen haben wieder von der Seite nehmen zu können". Wenn in der Kombination Wer? - Was? - Warum? keine Antwort auf die Warum Frage gegeben werden, so ist die Story unnötig und kann vernachlässigt und gelöscht werden.

Akzeptanzkriterien in der Story machen jedem klar, was alles gegeben sein muss, damit die Story beendet ist. Ein ungeschriebenes, aber immer vorhandenes, Akzeptanzkriterium ist, dass die Webseite in allen anderen Aspekten sich immer noch genau so verhält, wie zuvor.

## Stand der Technik
Frontend: React mit dem Package-Manager Yarn.
Backend: Node.js mit dem Framework Express.
Datenbank: PostgreSQL

## Links
- [How to Write a Git Commit Message](https://cbea.ms/git-commit)
