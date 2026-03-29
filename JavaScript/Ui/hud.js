function UpdateHUD() {
 
    /* -------------------------------------------- */
    /*               Expérience UI                  */
    /* -------------------------------------------- */
 
    const experienceBarValue = document.getElementById("experience-bar-value");
    let widthPlayerXp = Math.min(100, Math.max(0, (Player.stats.xp / Player.stats.xpToNext) * 100));
    experienceBarValue.style.width = widthPlayerXp + "%";
 
    const experienceBarText = document.getElementById("experience-bar-text");
    experienceBarText.innerText = "Niv." + level + "  —  XP " + Player.stats.xp + " / " + Player.stats.xpToNext;
}

/* -------------------------------------------- */
/*              Initiallisation                 */
/* -------------------------------------------- */

UpdateHUD ();
