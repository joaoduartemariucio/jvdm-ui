import SwiftUI

public struct Thumb<Fallback: View>: View {
    @Environment(\.jvdmTheme) private var theme

    public static var ratio: CGFloat { 4.0 / 3.0 }

    let src: URL?
    let alt: String
    private let fallback: Fallback

    public init(src: URL?, alt: String, @ViewBuilder fallback: () -> Fallback) {
        self.src = src
        self.alt = alt
        self.fallback = fallback()
    }

    public var body: some View {
        ZStack {
            if let src {
                AsyncImage(url: src) { image in
                    image.resizable().scaledToFill()
                } placeholder: {
                    fallback
                }
            } else {
                fallback
            }
        }
        .foregroundStyle(theme.color(.inkDim))
        .frame(maxWidth: .infinity)
        .aspectRatio(Self.ratio, contentMode: .fit)
        .background(theme.color(.raised))
        .clipShape(RoundedRectangle(cornerRadius: theme.radius(.md), style: .continuous))
        .accessibilityLabel(alt)
    }
}

extension Thumb where Fallback == EmptyView {
    public init(src: URL?, alt: String) {
        self.init(src: src, alt: alt) { EmptyView() }
    }
}
