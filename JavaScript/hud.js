function UpdateHUD() {

    /* -------------------------------------------- */
    /*               Expérience UI                  */
    /* -------------------------------------------- */

    const experienceBarValue = document.getElementById("experience-bar-value");
    let widthPlayerXp = ((Player.stats.xp / Player.stats.xpToNext) * 100);
    experienceBarValue.style.width = widthPlayerXp + "%";

    const experienceBarText = document.getElementById("experience-bar-text");
    experienceBarText.innerText = Player.stats.xp + " / " + Player.stats.xpToNext;

}

/* -------------------------------------------- */
/*              Initiallisation                 */
/* -------------------------------------------- */

UpdateHUD ();
