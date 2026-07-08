# 🚀 Guide Complet: Portfolio + Namecheap + GitHub Pages

## **⏱️ Temps total: ~15-20 minutes**

---

## **PARTIE 1: Acheter un domaine Namecheap (5 min)**

### Étape 1.1: Créer un compte
1. Allez sur [namecheap.com](https://www.namecheap.com)
2. Créez un compte (Sign up)
3. Connectez-vous

### Étape 1.2: Acheter le domaine
1. Cliquez sur **Domain Search**
2. Tapez votre domaine (ex: `onjanirina.com`)
3. Cliquez **Search**
4. Sélectionnez l'extension (`.com`, `.dev`, `.io`, etc.)
5. Cliquez **Add to Cart**
6. **Checkout** et payez (~$0.88 - $15 selon l'extension)

**✅ Domaine acheté !**

---

## **PARTIE 2: Configurer les DNS Namecheap (5 min)**

### Étape 2.1: Aller aux paramètres DNS
1. Allez à [namecheap.com/dashboard](https://www.namecheap.com/dashboard)
2. Cliquez sur **Domain List**
3. Trouvez votre domaine
4. Cliquez sur **Manage** (3 points ou bouton)
5. Allez à l'onglet **Advanced DNS**

### Étape 2.2: Ajouter les 4 A Records

**Record 1:**
- Type: `A`
- Host: `@`
- Value: `185.199.108.153`
- TTL: `3600`
- ✓ Enregistrer

**Record 2:**
- Type: `A`
- Host: `@`
- Value: `185.199.109.153`
- TTL: `3600`
- ✓ Enregistrer

**Record 3:**
- Type: `A`
- Host: `@`
- Value: `185.199.110.153`
- TTL: `3600`
- ✓ Enregistrer

**Record 4:**
- Type: `A`
- Host: `@`
- Value: `185.199.111.153`
- TTL: `3600`
- ✓ Enregistrer

### Étape 2.3: Ajouter le CNAME Record (pour www)
- Type: `CNAME`
- Host: `www`
- Value: `Evil-Ghoster.github.io`
- TTL: `3600`
- ✓ Enregistrer

**✅ DNS configurés !**

---

## **PARTIE 3: Configurer GitHub Pages (5 min)**

### Étape 3.1: Créer un repository GitHub
1. Allez sur [github.com/new](https://github.com/new)
2. **Repository name**: `Evil-Ghoster.github.io`
3. ✓ Public
4. ✓ Initialize with README
5. **Create repository**

### Étape 3.2: Pousser votre code
```bash
# Dans votre dossier Portfolio
cd d:\Doc_Ghoster\Projet\Portfolio

# Initialiser Git
git init
git add .
git commit -m "Portfolio setup with Namecheap domain"

# Ajouter le repository distant
git remote add origin https://github.com/Evil-Ghoster/Evil-Ghoster.github.io.git

# Pousser le code
git branch -M main
git push -u origin main
```

### Étape 3.3: Vérifier le déploiement
1. Allez à [github.com/Evil-Ghoster/Evil-Ghoster.github.io](https://github.com/Evil-Ghoster/Evil-Ghoster.github.io)
2. Cliquez sur l'onglet **Actions**
3. Regardez le workflow **Deploy to GitHub Pages**
4. Attendez le ✅ (vert)

### Étape 3.4: Activer Custom Domain
1. Allez à **Settings** du repository
2. Scroll à **Pages**
3. Sous "Custom domain", entrez: `onjanirina.com`
4. ✓ Save
5. Attendez le ✅ (DNS vérifié)

**✅ Domaine connecté !**

---

## **PARTIE 4: Tester votre site (2 min)**

1. Attendez **15-30 minutes** (propagation DNS)
2. Ouvrez: `https://onjanirina.com`
3. 🎉 Votre site est en ligne !

Vous pouvez aussi accéder via:
- `https://www.onjanirina.com`
- `https://Evil-Ghoster.github.io`

---

## **📝 À retenir: Les fichiers importants**

```
Portfolio/
├── main.html                          # Votre page
├── style.css                          # Styles
├── script.js                          # Interaction
├── CNAME                              # ← Domaine (créé automatiquement)
├── .github/workflows/deploy.yml       # ← CI/CD GitHub Actions
├── .gitignore                         # Fichiers à ignorer
└── README.md                          # Documentation
```

---

## **🔄 Apporter des modifications (workflow quotidien)**

```bash
# 1. Modifier vos fichiers
# (éditez main.html, style.css, script.js)

# 2. Pousser les changements
git add .
git commit -m "Update: description du changement"
git push origin main

# 3. Voilà ! Votre site se met à jour automatiquement ⚡
# (visible en 30 secondes - 2 minutes)
```

---

## **⚠️ Dépannage**

### Le domaine ne fonctionne pas après 1h?
1. Allez à [whatsmydns.net](https://whatsmydns.net)
2. Cherchez votre domaine
3. Vérifiez que les DNS pointent vers GitHub (185.199.108.153, etc.)
4. Si non: vérifiez les A Records dans Namecheap

### Le certificat SSL n'apparaît pas?
- Attendez 24h (GitHub génère automatiquement)
- Revenez à Settings > Pages et décochez/cochez "Enforce HTTPS"

### GitHub Actions échoue?
- Allez à l'onglet **Actions** du repo
- Cliquez sur le workflow échoué
- Lisez l'erreur et corrigez

---

## **🎉 C'est fini !**

Votre site est maintenant:
- ✅ Hébergé gratuitement sur GitHub Pages
- ✅ Accessible via votre domaine Namecheap
- ✅ Auto-déploiement avec GitHub Actions
- ✅ Modifications permanentes avec CI/CD

**Bienvenue dans le déploiement professionnel !** 🚀

---

## **📚 Ressources**

- **GitHub Pages Docs**: https://pages.github.com
- **Namecheap Help**: https://www.namecheap.com/support/
- **GitHub Actions**: https://docs.github.com/en/actions
- **Custom Domain Guide**: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
