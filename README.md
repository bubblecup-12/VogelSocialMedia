# VogelSocialMedia
Eine Social Media Plattform zum Teilen von Vogelbildern
## Versionskontrolle
Wir verwenden git um eine Versionskontrolle zu gewährleisten. Um ein neues Feature anzufangen **muss** ein neuer Branch erstellt werden.

>Es wird unter keinen umständen im `main` Branch gecodet!

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
Commit Nachrichten sollten sinnvoll geschrieben werden.

## Umgang mit Stories
Bevor mit einer Aufgabe angefangen wird muss eine Story dazu im Backlog stehen. Diese beinhaltet eine Description, in welcher mit einem Satz beschrieben wird was und warum etwas gemacht werden soll. Ein Beispiel hierfür wäre: "Als Nutzer:in möchte ich ein Bild löschen können, um Bilder, welche mir nicht gefallen haben wieder von der Seite nehmen zu können". Wenn in der Kombination Wer? - Was? - Warum? keine Antwort auf die Warum Frage gegeben werden, so ist die Story unnötig und kann vernachlässigt und gelöscht werden.
Akzeptanzkriterien in der Story machen jedem klar, was alles gegeben sein muss, damit die Story beendet ist. Ein ungeschriebenes, aber immer vorhandenes, Akzeptanzkriterium ist, dass die Webseite in allen anderen Aspekten sich immer noch genau so verhält, wie zuvor.
## Links
- [How to Write a Git Commit Message](https://cbea.ms/git-commit)
