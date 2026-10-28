import Testing
import SwiftUI

@testable import JvdmUI

@Suite("Pagination")
struct PaginationTests {
    @Test("says four things on its own, one of them with the page number")
    func locales() {
        #expect(PaginationLocales.label == "Pagination")
        #expect(PaginationLocales.previous == "Previous")
        #expect(PaginationLocales.next == "Next")
        #expect(PaginationLocales.page(3) == "Page 3")
    }

    @Test("the page string reads the number it is given")
    func parameterised() {
        #expect(PaginationLocales.page(1) == "Page 1")
        #expect(PaginationLocales.page(42) == "Page 42")
        #expect(PaginationLocales.page(1) != PaginationLocales.page(2))
    }

    @Test("a caller can replace it with one of its own")
    func overridable() {
        let subject = Pagination(
            page: 1,
            pages: 3,
            pageLabel: { "Página \($0)" },
            onPageChange: { _ in }
        )
        #expect(subject.pageLabel(7) == "Página 7")
    }

    @Test("clamps the page into the range")
    func clamp() {
        #expect(Pagination.clamp(0, pages: 5) == 1)
        #expect(Pagination.clamp(3, pages: 5) == 3)
        #expect(Pagination.clamp(9, pages: 5) == 5)
        #expect(Pagination.clamp(1, pages: 0) == 1)
    }
}

@Suite("Accordion")
struct AccordionTests {
    @Test("opens and closes a row")
    func toggle() {
        #expect(Accordion<Text, Text>.toggled([], "a", exclusive: false) == ["a"])
        #expect(Accordion<Text, Text>.toggled(["a"], "a", exclusive: false) == [])
    }

    @Test("keeps the others open unless it is exclusive")
    func exclusive() {
        #expect(Accordion<Text, Text>.toggled(["a"], "b", exclusive: false) == ["a", "b"])
        #expect(Accordion<Text, Text>.toggled(["a"], "b", exclusive: true) == ["b"])
        #expect(Accordion<Text, Text>.toggled(["a", "b"], "a", exclusive: true) == ["b"])
    }
}

@Suite("Tabs and Thumb")
struct TabsThumbTests {
    @Test("tabs say their own label")
    func tabsLocale() {
        #expect(TabsLocales.label == "Tabs")
        #expect(
            Tabs(items: [TabItem<Text>](), value: "", label: "Abas", onValueChange: { _ in }).label
                == "Abas"
        )
    }

    @Test("a thumb keeps the 4:3 frame the web uses")
    func thumbRatio() {
        #expect(Thumb<EmptyView>.ratio == CGFloat(4) / CGFloat(3))
    }
}
