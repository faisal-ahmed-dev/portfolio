import type { Principle } from "@/types/portfolio.types";

export const PRINCIPLES: Principle[] = [
  {
    id: "srp",
    title: "Single Responsibility",
    acronym: "S",
    description: "Every module, class, or function should have one reason to change. In our POS system, KOT management, payment processing, and menu sync are isolated domains.",
    codeSnippet: `// ✅ Single responsibility — each hook owns one domain
const useKOTManager = () => {
  // ONLY manages kitchen order tickets
  const [orders, setOrders] = useAtom(posOrderAtom);
  const printKOT = useCallback((order: Order) => {
    return kotService.print(order);
  }, []);
  return { orders, printKOT };
};

// ❌ Avoid: god hooks that mix concerns
// const usePOSEverything = () => { ... }`,
    language: "typescript",
    color: "cyan",
  },
  {
    id: "ocp",
    title: "Open / Closed",
    acronym: "O",
    description: "Open for extension, closed for modification. Our form builder accepts new field types without touching the renderer.",
    codeSnippet: `// Registry pattern — add new types without modifying existing code
const FIELD_RENDERERS: Record<FieldType, React.FC<FieldProps>> = {
  text:     TextFieldRenderer,
  select:   SelectFieldRenderer,
  checkbox: CheckboxRenderer,
  // ✅ New type? Just add here, renderer untouched
  rating:   RatingRenderer,
};

const FormField = ({ field }: { field: FormFieldDef }) => {
  const Renderer = FIELD_RENDERERS[field.type];
  return <Renderer {...field} />;
};`,
    language: "typescript",
    color: "indigo",
  },
  {
    id: "lsp",
    title: "Liskov Substitution",
    acronym: "L",
    description: "Subtypes must be substitutable for their base types. Our storage adapters work interchangeably — IndexedDB in prod, memory in tests.",
    codeSnippet: `interface OrderStorage {
  save(order: Order): Promise<void>;
  find(id: string): Promise<Order | null>;
  findAll(): Promise<Order[]>;
}

// ✅ Both are substitutable — same contract
class IndexedDBStorage implements OrderStorage { ... }
class InMemoryStorage implements OrderStorage { ... }

// Consumer never knows which impl it gets
const storage: OrderStorage = isOffline
  ? new IndexedDBStorage()
  : new InMemoryStorage();`,
    language: "typescript",
    color: "cyan",
  },
  {
    id: "isp",
    title: "Interface Segregation",
    acronym: "I",
    description: "Clients should not depend on interfaces they don't use. Split large interfaces into focused ones.",
    codeSnippet: `// ❌ Fat interface — MenuItem must implement print even if irrelevant
interface POSEntity {
  render(): JSX.Element;
  print(): void;
  sync(): Promise<void>;
}

// ✅ Segregated — components only implement what they need
interface Renderable { render(): JSX.Element; }
interface Printable  { print(): void; }
interface Syncable   { sync(): Promise<void>; }

// MenuItem only needs Renderable
class MenuItem implements Renderable { ... }`,
    language: "typescript",
    color: "indigo",
  },
  {
    id: "dip",
    title: "Dependency Inversion",
    acronym: "D",
    description: "High-level modules should not depend on low-level ones. Both should depend on abstractions.",
    codeSnippet: `// ✅ High-level hook depends on abstraction, not concrete API
interface AnalyticsPort {
  track(event: string, data: Record<string, unknown>): void;
}

// Inject via props or context — swap impl freely
const useOrderTracking = (analytics: AnalyticsPort) => {
  const trackOrder = (order: Order) => {
    analytics.track('order_placed', { id: order.id, total: order.total });
  };
  return { trackOrder };
};

// Production: MixpanelAnalytics | Tests: MockAnalytics`,
    language: "typescript",
    color: "cyan",
  },
  {
    id: "dry",
    title: "Don't Repeat Yourself",
    acronym: "DRY",
    description: "Every piece of knowledge should have a single, authoritative representation. We centralize formatters, validators, and transforms.",
    codeSnippet: `// ✅ Single source of truth for currency formatting
const formatCurrency = (amount: number, currency = 'SAR') =>
  new Intl.NumberFormat('en-SA', { style: 'currency', currency })
    .format(amount / 100); // stored in cents

// Used everywhere — cart total, receipts, analytics
// Change locale once → updates across entire app`,
    language: "typescript",
    color: "indigo",
  },
  {
    id: "clean",
    title: "Clean Architecture",
    acronym: "CA",
    description: "Entities → Use Cases → Interface Adapters → Frameworks. The inner layers never know about React or Next.js.",
    codeSnippet: `// Entities (pure business logic — no React imports)
class Order {
  constructor(public items: OrderItem[]) {}
  get total() { return this.items.reduce((s, i) => s + i.price * i.qty, 0); }
  addItem(item: OrderItem) { return new Order([...this.items, item]); }
}

// Use Case (orchestrates entities)
class PlaceOrderUseCase {
  constructor(private storage: OrderStorage, private notify: NotifyPort) {}
  async execute(order: Order) {
    await this.storage.save(order);
    await this.notify.send('order.placed', order);
  }
}

// React layer (thin adapter — just calls use cases)
const usePlaceOrder = () => {
  const useCase = useMemo(() => container.resolve(PlaceOrderUseCase), []);
  return useCase.execute.bind(useCase);
};`,
    language: "typescript",
    color: "mixed",
  },
];
