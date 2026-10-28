// swift-tools-version:6.0
import PackageDescription

let package = Package(
    name: "JvdmUI",
    platforms: [.iOS(.v17), .macOS(.v14)],
    products: [
        .library(name: "JvdmUI", targets: ["JvdmUI"])
    ],
    targets: [
        .target(name: "JvdmUI", path: "packages/ios/Sources/JvdmUI"),
        .testTarget(
            name: "JvdmUITests",
            dependencies: ["JvdmUI"],
            path: "packages/ios/Tests/JvdmUITests"
        ),
    ]
)
