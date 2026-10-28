plugins {
    id("com.android.library") version "9.3.3"
    id("org.jetbrains.kotlin.plugin.compose") version "2.4.21"
    id("org.jlleitschuh.gradle.ktlint") version "14.2.0"
    id("maven-publish")
}

group = "com.jvdm"
version = "0.1.0"

android {
    namespace = "com.jvdm.ui"
    compileSdk = 37

    defaultConfig {
        minSdk = 24
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    buildFeatures {
        compose = true
    }

    publishing {
        singleVariant("release") {
            withSourcesJar()
        }
    }
}

kotlin {
    explicitApi()
}

dependencies {
    implementation(platform("androidx.compose:compose-bom:2026.09.00"))
    implementation("androidx.compose.foundation:foundation")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.ui:ui")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit:2.4.21")
    testImplementation("junit:junit:4.13.2")
}

ktlint {
    version.set("1.5.0")
    filter {
        exclude { it.file.path.contains("tokens/Tokens.kt") }
        exclude { it.file.name.endsWith("Icon.kt") && it.file.name != "JvdmIcon.kt" }
    }
}

publishing {
    publications {
        register<MavenPublication>("release") {
            groupId = "com.jvdm"
            artifactId = "jvdm-ui"

            afterEvaluate {
                from(components["release"])
            }

            pom {
                name.set("jvdm-ui")
                description.set("jvdm-ui for Android: the same tokens and the same component contract, in Compose.")
                url.set("https://joaoduartemariucio.github.io/jvdm-ui")
                licenses {
                    license {
                        name.set("MIT")
                        url.set("https://opensource.org/licenses/MIT")
                    }
                }
            }
        }
    }
}
