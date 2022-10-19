describe('element plus plugin', () => {
  let plugin;
  beforeEach(async () => {
    vi.clearAllMocks();
    vi.resetAllMocks();
    vi.mock('element-plus', () => {
      return {
        default: 'DEMO-ELEMENT-PLUS'
      }
    })
    vi.mock('@element-plus/icons-vue', () => {
      return {}
    })
    plugin = (await import('../element')).default;
  })

  test('should exist', () => {
    expect(plugin).toBeTruthy();
    expect(plugin).toBeTypeOf('function');
  })

  test('should throw when app not given', () => {
    try {
      plugin()
      expect('working').toBe(false);
    } catch (err) {
      expect(err).toBeDefined();
    }
  })

  test('should install element-plus plugin on app', () => {
    const demoApp = {
      use: vi.fn(),
      component: vi.fn()
    }

    plugin(demoApp);
    expect(demoApp.use).toBeCalledTimes(1);
    expect(demoApp.use).toHaveBeenCalledWith('DEMO-ELEMENT-PLUS');
  })

  test('should load icons components', async () => {
    const demoApp = {
      use: vi.fn(),
      component: vi.fn()
    }
    const icons: any = await import('@element-plus/icons-vue');
    icons['Plus'] = 'plus-component';
    icons['Minus'] = 'minus-component';

    expect(icons).toMatchInlineSnapshot(`
      {
        "Minus": "minus-component",
        "Plus": "plus-component",
      }
    `)

    plugin(demoApp);
    expect(demoApp.component).toBeCalledTimes(2);
    expect(demoApp.component.mock.calls).toEqual([['IconPlus', 'plus-component'], ['IconMinus', 'minus-component']])
  })
})
